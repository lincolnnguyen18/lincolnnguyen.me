import { ddbClient } from '../common/clients.js';
import { DeleteCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { environment } from '../common/environment.js';
import { buildUpdateExpression } from '../common/stringUtils.js';
import bcrypt from 'bcrypt';

class UserDynamoDao {
  constructor (tableName) {
    this.tableName = tableName;
  }

  async putUser ({ id, username, password, playbackSpeed = 1, transcribeLang = 'Japanese', translateLang = 'English (United States)', timestamp = new Date().toISOString() }) {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    let params = {
      TableName: this.tableName,
      IndexName: 'usernameIdLookupIndex',
      KeyConditionExpression: 'pk = :pk and username = :username',
      ExpressionAttributeValues: {
        ':pk': 'userData',
        ':username': username,
      },
    };
    let exists = await ddbClient.send(new QueryCommand(params));
    exists = exists.Items.length > 0;
    if (exists) {
      return ['Username already exists'];
    }

    params = {
      TableName: this.tableName,
      Item: {
        pk: 'userData',
        sk: id,
        username,
        password,
        playbackSpeed,
        transcribeLang,
        translateLang,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      ConditionExpression: 'attribute_not_exists(pk)',
    };
    try {
      await ddbClient.send(new PutCommand(params));
      return [];
    } catch (e) {
      console.error(e);
      return ['UUID collision'];
    }
  }

  async updateUser ({ id, username, password, playbackSpeed, transcribeLang, translateLang }) {
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
    }
    const attributes = {
      username,
      password,
      playbackSpeed,
      transcribeLang,
      translateLang,
      updatedAt: new Date().toISOString(),
    };
    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } = buildUpdateExpression(attributes);

    const params = {
      TableName: this.tableName,
      Key: {
        pk: 'userData',
        sk: id,
      },
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    };
    try {
      await ddbClient.send(new UpdateCommand(params));
      return [];
    } catch (e) {
      console.error(e);
      return ['Update failed'];
    }
  }

  async getIdFromUsername (username) {
    const params = {
      TableName: this.tableName,
      IndexName: 'usernameIdLookupIndex',
      KeyConditionExpression: 'pk = :pk and username = :username',
      ExpressionAttributeValues: {
        ':pk': 'userData',
        ':username': username,
      },
    };
    const exists = await ddbClient.send(new QueryCommand(params));
    if (exists.Items.length === 0) {
      return null;
    }
    return exists.Items[0].sk;
  }

  async getUserFromId (id) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
        ':pk': 'userData',
        ':sk': id,
      },
    };
    const exists = await ddbClient.send(new QueryCommand(params));
    if (exists.Items.length === 0) {
      return null;
    }
    const user = exists.Items[0];
    user.id = user.sk;
    return user;
  }

  async deleteUserById (id) {
    const params = {
      TableName: this.tableName,
      Key: {
        pk: 'userData',
        sk: id,
      },
    };
    return ddbClient.send(new DeleteCommand(params));
  }
}

const userDynamoDao = new UserDynamoDao(environment.DDB_MAIN_TABLE);

export { UserDynamoDao, userDynamoDao };
