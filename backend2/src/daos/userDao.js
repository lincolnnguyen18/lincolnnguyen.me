import { ddbClient } from '../common/clients.js';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { environment } from '../common/environment.js';
import { uuid } from '../common/stringUtils.js';

class UserDao {
  constructor (tableName) {
    this.tableName = tableName;
  }

  async putUser ({ username, password }) {
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
      return [{ field: 'username', message: 'Username already exists' }];
    }

    params = {
      TableName: this.tableName,
      Item: {
        pk: 'userData',
        sk: uuid(),
        username,
        password,
        playbackSpeed: 1.0,
        transcribeLang: 'Japanese',
        translateLang: 'English (United States)',
      },
      ConditionExpression: 'attribute_not_exists(pk)',
    };
    try {
      await ddbClient.send(new PutCommand(params));
      return [];
    } catch (e) {
      console.error(e);
      return [{ field: 'username', message: 'UUID collision' }];
    }
  }
}

const userDao = new UserDao(environment.MAIN_TABLE_NAME);

export { UserDao, userDao };
