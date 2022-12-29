import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
import { SharedDao } from '../shared/sharedDao.js';
dotenv.config({ path: './.env' });

const tableSchema = new dynamoose.Schema({
  pk: { type: String, hashKey: true },
  sk: { type: String, rangeKey: true },
  createdAt: String,
  updatedAt: String,

  // user contact
  contactId: String,

  // message
  type: String,
  direction: String,
  text: String,
  callId: Number,
  imageUrl: String,

  // call
  id: String,
  duration: Number,
});

class SpeechchatDao {
  constructor (tableName) {
    this.table = dynamoose.model(tableName, tableSchema, { throughput: 'ON_DEMAND' });
    this.sharedDao = new SharedDao(tableName);
  }

  async addConnection ({ initiatorUserId, receiverUserId, timestamp }) {
    // verify both emails exist
    const initiatorUser = await this.sharedDao.getUserById(initiatorUserId);
    const receiverUser = await this.sharedDao.getUserById(receiverUserId);
    if (!initiatorUser || !receiverUser) {
      throw new Error('No user exists with this id');
    }

    try {
      await dynamoose.transaction([
        this.table.transaction.create({
          pk: `speechchat#${initiatorUserId}`,
          sk: `contact#${timestamp}#${initiatorUserId}`,
          createdAt: timestamp,
          updatedAt: timestamp,
          contactId: receiverUserId,
        }),
        this.table.transaction.create({
          pk: `speechchat#${receiverUserId}`,
          sk: `contact#${timestamp}#${receiverUserId}`,
          createdAt: timestamp,
          updatedAt: timestamp,
          contactId: initiatorUserId,
        }),
      ]);
    } catch (error) {
      // console.error(error);
      throw new Error('This user is already in your contacts');
    }
  }

  async getContacts (userId) {
    // pk = connection
    // sk starts with info#{lookupEmail}
    return await this.table
      .query('pk').eq(`speechchat#${userId}`)
      .where('sk').beginsWith('contact#')
      .sort('descending')
      .exec();
  }

  async addMessage ({ senderUserId, receiverUserId, type, text, createdAt, callId, imageUrl }) {
    if (senderUserId === receiverUserId) {
      throw new Error('You cannot send a message to yourself');
    }

    // verify both emails exist
    const senderUser = await this.sharedDao.getUserById(senderUserId);
    const receiverUser = await this.sharedDao.getUserById(receiverUserId);
    if (!senderUser || !receiverUser) {
      throw new Error('No user exists with this id');
    }

    try {
      let pk, direction;
      if (senderUserId < receiverUserId) {
        pk = `speechchat#${senderUserId}#${receiverUserId}`;
        direction = 'right';
      } else {
        pk = `speechchat#${receiverUserId}#${senderUserId}`;
        direction = 'left';
      }
      const sk = `message#${createdAt}`;
      await this.table.create({
        pk,
        sk,
        type,
        text,
        direction,
        createdAt,
        callId,
        imageUrl,
      }, {
        overwrite: false,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Could not send message');
    }
  }
}

const speechchatDao = new SpeechchatDao(process.env.SHARED_TABLE_NAME);

export { SpeechchatDao, speechchatDao };
