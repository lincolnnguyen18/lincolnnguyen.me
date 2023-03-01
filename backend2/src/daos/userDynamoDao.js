import { ddbClient } from '../common/clients.js';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { environment } from '../common/environment.js';

class UserDynamoDao {
  constructor (tableName) {
    this.tableName = tableName;
  }

  async putUser ({ id, username, password, playbackSpeed = 1, transcribeLang = 'Japanese', translateLang = 'English (United States)', timestamp = new Date().toISOString() }) {
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
      return [{ field: ['username'], message: 'Username already exists' }];
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
      return [{ field: ['username'], message: 'UUID collision' }];
    }
  }
}

const userDynamoDao = new UserDynamoDao(environment.DDB_MAIN_TABLE);

export { UserDynamoDao, userDynamoDao };
