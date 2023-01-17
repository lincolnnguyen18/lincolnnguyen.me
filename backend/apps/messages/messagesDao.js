import dotenv from 'dotenv';
import { SharedDao } from '../shared/sharedDao.js';
import { dynamoDBClient } from '../shared/utils/sharedClients.js';
import { PutCommand, QueryCommand, TransactWriteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
dotenv.config({ path: './.env.development' });

class MessagesDao {
  constructor (tableName) {
    this.sharedDao = new SharedDao(tableName);
    this.tableName = tableName;
  }

  async addConnection ({ initiatorUserId, receiverUserId, timestamp }) {
    // verify both emails exist
    const initiatorUser = await this.sharedDao.getUserById(initiatorUserId);
    const receiverUser = await this.sharedDao.getUserById(receiverUserId);
    // console.log('initiatorUser', initiatorUser);
    // console.log('receiverUser', receiverUser);
    if (!initiatorUser || !receiverUser) {
      throw new Error('User not found');
    }

    try {
      await dynamoDBClient.send(new TransactWriteCommand({
        TransactItems: [
          {
            Put: {
              TableName: this.tableName,
              Item: {
                pk: `messages#${initiatorUserId}`,
                sk: `contact#${receiverUserId}`,
                createdAt: timestamp,
                updatedAt: timestamp,
                contactId: receiverUserId,
              },
              ConditionExpression: 'attribute_not_exists(pk)',
            },
          },
          {
            Put: {
              TableName: this.tableName,
              Item: {
                pk: `messages#${receiverUserId}`,
                sk: `contact#${initiatorUserId}`,
                createdAt: timestamp,
                updatedAt: timestamp,
                contactId: initiatorUserId,
              },
              ConditionExpression: 'attribute_not_exists(pk)',
            },
          },
        ],
      }));
    } catch (e) {
      // console.log('error', e);
      throw new Error('This user is already in your contacts');
    }
  }

  async getContacts (userId, { limit, lastKey }) {
    const params = {
      TableName: this.tableName,
      IndexName: 'contactsUpdatedAtIndex',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': `messages#${userId}`,
      },
      Limit: limit,
      ScanIndexForward: false,
      ExclusiveStartKey: lastKey ?? undefined,
    };
    const res = await dynamoDBClient.send(new QueryCommand(params));
    const contactMetadatas = res.Items;
    const contacts = await Promise.all(contactMetadatas.map(contactMetadata => this.sharedDao.getUserById(contactMetadata.contactId)));
    contacts.forEach((contact, i) => {
      contact.updatedAt = contactMetadatas[i].updatedAt;
      contact.createdAt = contactMetadatas[i].createdAt;
    });
    // console.log('contacts', contacts);
    return {
      paginatedItems: contacts,
      lastKey: res.LastEvaluatedKey,
    };
  }

  async addMessage (params) {
    const { senderUserId, receiverUserId, type, createdAt } = params;
    if (senderUserId === receiverUserId) {
      throw new Error('You cannot send a message to yourself');
    }

    // verify both emails exist
    const senderUser = await this.sharedDao.getUserById(senderUserId);
    const receiverUser = await this.sharedDao.getUserById(receiverUserId);
    if (!senderUser || !receiverUser) {
      throw new Error('User not found');
    }

    let pk, direction;
    if (senderUserId < receiverUserId) {
      pk = `messages#${senderUserId}#${receiverUserId}`;
      direction = 'right';
    } else {
      pk = `messages#${receiverUserId}#${senderUserId}`;
      direction = 'left';
    }
    const sk = `message#${createdAt}`;
    const Item = {
      pk,
      sk,
      type,
      direction,
      createdAt,
    };
    ['text', 'callId', 'imageUrl'].forEach(key => {
      if (params[key]) {
        Item[key] = params[key];
      }
    });
    try {
      await dynamoDBClient.send(new PutCommand({
        TableName: this.tableName,
        Item,
        ConditionExpression: 'attribute_not_exists(pk)',
      }));
    } catch (e) {
      // console.log('error', e);
      throw new Error('Sent message too quickly');
    }
    // update updatedAt for contacts table for both users
    await Promise.all([
      dynamoDBClient.send(new UpdateCommand({
        TableName: this.tableName,
        Key: {
          pk: `messages#${senderUserId}`,
          sk: `contact#${receiverUserId}`,
        },
        UpdateExpression: 'set updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':updatedAt': createdAt,
        },
        ConditionExpression: 'attribute_exists(pk)',
      })),
      dynamoDBClient.send(new UpdateCommand({
        TableName: this.tableName,
        Key: {
          pk: `messages#${receiverUserId}`,
          sk: `contact#${senderUserId}`,
        },
        UpdateExpression: 'set updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':updatedAt': createdAt,
        },
        ConditionExpression: 'attribute_exists(pk)',
      })),
    ]);
  }

  async getMessages (userId, contactId, { limit, lastKey }) {
    let pk;
    if (userId < contactId) {
      pk = `messages#${userId}#${contactId}`;
    } else {
      pk = `messages#${contactId}#${userId}`;
    }
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': pk,
      },
      Limit: limit,
      ScanIndexForward: false,
      ExclusiveStartKey: lastKey ?? undefined,
    };
    const res = await dynamoDBClient.send(new QueryCommand(params));
    return {
      paginatedItems: res.Items,
      lastKey: res.LastEvaluatedKey,
    };
  }
}

const messagesDao = new MessagesDao(process.env.SHARED_TABLE_NAME);

export { MessagesDao, messagesDao };
