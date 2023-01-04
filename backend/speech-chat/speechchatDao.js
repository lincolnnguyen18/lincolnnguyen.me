import dotenv from 'dotenv';
import { SharedDao } from '../shared/sharedDao.js';
import { dynamoDBClient } from '../shared/utils/sharedClients.js';
import { PutCommand, QueryCommand, TransactWriteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { GraphQLError } from 'graphql';
dotenv.config({ path: './.env' });

class SpeechchatDao {
  constructor (tableName) {
    this.sharedDao = new SharedDao(tableName);
    this.tableName = tableName;
  }

  async addConnection ({ initiatorUserId, receiverUserId, timestamp }) {
    // verify both emails exist
    const initiatorUser = await this.sharedDao.getUserById(initiatorUserId);
    const receiverUser = await this.sharedDao.getUserById(receiverUserId);
    if (!initiatorUser || !receiverUser) {
      throw new GraphQLError('No user exists with this id');
    }

    try {
      await dynamoDBClient.send(new TransactWriteCommand({
        TransactItems: [
          {
            Put: {
              TableName: this.tableName,
              Item: {
                pk: `speechchat#${initiatorUserId}`,
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
                pk: `speechchat#${receiverUserId}`,
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
      throw new GraphQLError('This user is already in your contacts');
    }
  }

  async getContacts (userId, { limit, lastKey }) {
    const params = {
      TableName: this.tableName,
      IndexName: 'contactsUpdatedAtIndex',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': `speechchat#${userId}`,
      },
      Limit: limit,
      ScanIndexForward: false,
      ExclusiveStartKey: lastKey ?? undefined,
    };
    const res = await dynamoDBClient.send(new QueryCommand(params));
    const contacts = res.Items;
    let users = await Promise.all(contacts.map(contact => this.sharedDao.getUserById(contact.contactId)));
    // set user.updatedAt (user's lastLogin) to contact.updatedAt (contact's last message)
    users = users.map(user => {
      const contact = contacts.find(contact => contact.contactId === user.id);
      user.updatedAt = contact.updatedAt;
      return user;
    });
    return {
      contacts: users,
      lastKey: res.LastEvaluatedKey,
    };
  }

  async addMessage (params) {
    const { senderUserId, receiverUserId, type, createdAt } = params;
    if (senderUserId === receiverUserId) {
      throw new GraphQLError('You cannot send a message to yourself');
    }

    // verify both emails exist
    const senderUser = await this.sharedDao.getUserById(senderUserId);
    const receiverUser = await this.sharedDao.getUserById(receiverUserId);
    if (!senderUser || !receiverUser) {
      throw new GraphQLError('No user exists with this id');
    }

    let pk, direction;
    if (senderUserId < receiverUserId) {
      pk = `speechchat#${senderUserId}#${receiverUserId}`;
      direction = 'right';
    } else {
      pk = `speechchat#${receiverUserId}#${senderUserId}`;
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
      throw new GraphQLError('Sent message too quickly');
    }
    // update updatedAt for contacts table for both users
    await Promise.all([
      dynamoDBClient.send(new UpdateCommand({
        TableName: this.tableName,
        Key: {
          pk: `speechchat#${senderUserId}`,
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
          pk: `speechchat#${receiverUserId}`,
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
      pk = `speechchat#${userId}#${contactId}`;
    } else {
      pk = `speechchat#${contactId}#${userId}`;
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
      messages: res.Items,
      lastKey: res.LastEvaluatedKey,
    };
  }
}

const speechchatDao = new SpeechchatDao(process.env.SHARED_TABLE_NAME);

export { SpeechchatDao, speechchatDao };
