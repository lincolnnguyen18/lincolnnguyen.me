import dotenv from 'dotenv';
import { dynamoDBClient } from './utils/sharedClients.js';
import { DeleteCommand, GetCommand, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

dotenv.config({ path: './.env' });

class SharedDao {
  constructor (tableName) {
    this.tableName = tableName;
  }

  async getUserById (id) {
    const params = {
      TableName: this.tableName,
      Key: {
        pk: `user#${id}`,
        sk: 'info',
      },
    };
    const res = await dynamoDBClient.send(new GetCommand(params));
    return res.Item;
  }

  async addUser ({ id, picture, email, familyName, givenName, createdAt }) {
    const params = {
      TableName: this.tableName,
      Item: {
        pk: `user#${id}`,
        sk: 'info',
        id,
        picture,
        email,
        familyName,
        givenName,
        createdAt,
        updatedAt: createdAt,
        pk2: 'users',
        pk3: 'emails',
      },
      ConditionExpression: 'attribute_not_exists(pk)',
    };
    return dynamoDBClient.send(new PutCommand(params));
  }

  async getAllUsers () {
    const params = {
      TableName: this.tableName,
      IndexName: 'emailsIndex',
      KeyConditionExpression: 'pk3 = :pk3',
      ExpressionAttributeValues: {
        ':pk3': 'emails',
      },
    };
    const res = await dynamoDBClient.send(new QueryCommand(params));
    return res.Items;
  }

  async getIdFromEmail (email) {
    const params = {
      TableName: this.tableName,
      IndexName: 'emailsIndex',
      KeyConditionExpression: 'pk3 = :pk3 AND email = :email',
      ExpressionAttributeValues: {
        ':pk3': 'emails',
        ':email': email,
      },
    };
    const res = await dynamoDBClient.send(new QueryCommand(params));
    if (res.Items.length === 0) {
      return null;
    } else {
      return res.Items[0].id;
    }
  }

  async updateUser (id, updateObj) {
    updateObj.updatedAt = Date.now();
    let UpdateExpression = 'set';
    const ExpressionAttributeValues = {};
    const ExpressionAttributeNames = {};
    for (const key in updateObj) {
      const value = updateObj[key];
      const keyName = `:${key}`;
      const attrName = `#${key}`;
      UpdateExpression += ` ${attrName} = ${keyName},`;
      ExpressionAttributeValues[keyName] = value;
      ExpressionAttributeNames[attrName] = key;
    }
    UpdateExpression = UpdateExpression.slice(0, -1);

    const params = {
      TableName: this.tableName,
      Key: {
        pk: `user#${id}`,
        sk: 'info',
      },
      UpdateExpression,
      ExpressionAttributeValues,
      ExpressionAttributeNames,
      ReturnValues: 'UPDATED_NEW',
      ConditionExpression: 'attribute_exists(pk)',
    };
    const res = await dynamoDBClient.send(new UpdateCommand(params));
    return res.Attributes;
  }

  async deleteAllItemsInTable () {
    const params = {
      TableName: this.tableName,
    };
    const res = await dynamoDBClient.send(new ScanCommand(params));
    const promises = [];
    for (const item of res.Items) {
      const params = {
        TableName: this.tableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
      };
      promises.push(dynamoDBClient.send(new DeleteCommand(params)));
    }
    await Promise.all(promises);
  }
}

const sharedDao = new SharedDao(process.env.SHARED_TABLE_NAME);

export { SharedDao, sharedDao };
