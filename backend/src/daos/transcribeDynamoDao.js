import { ddbClient } from '../common/clients.js';
import { DeleteCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { environment } from '../common/environment.js';
import { buildUpdateExpression } from '../common/stringUtils.js';

class TranscribeDynamoDao {
  constructor (tableName) {
    this.tableName = tableName;
  }

  // {
  //   "id": "1",
  //   "title": "Untitled  Transcript",
  //   "parts": {
  //     "36ccd993-2191-426f-afa5-ca30e466e7cc": {
  //       "createdAt": 1678085448821,
  //       "duration": 9.942,
  //       "results": [
  //         {
  //           "timestamp": 0,
  //           "text": "明日の2巻です今日二十四節気の一つということであるがどんどん進んでいきますけれども",
  //           "translation": "Tomorrow's volume 2 is one of the twenty-four solar terms today, but it's progressing steadily."
  //         }
  //       ],
  //       "unsaved": true,
  //       "audioUrl": "blob:http://localhost:3000/fd53a565-d9d2-4eb6-9f29-40520a1e252a"
  //     }
  //   },
  //   "partsOrder": [
  //     "36ccd993-2191-426f-afa5-ca30e466e7cc"
  //   ],
  //   "createdAt": 1678085448826,
  //   "updatedAt": null,
  //   "preview": "明日の2巻です今日二十四節気の一つということであるがどんどん進んでいきますけれども (Tomorrow's volume 2 is one of the twenty-four solar terms today, but it's progressing steadily.) "
  // }

  async putTranscript ({ userId, id, title, partsKey, partsOrder, preview, createdAt, updatedAt }) {
    const params = {
      TableName: this.tableName,
      Item: {
        pk: `userTranscripts#${userId}`,
        sk: `transcript#${id}`,
        title,
        partsKey,
        partsOrder,
        preview,
        transcriptCreatedAt: createdAt,
        transcriptUpdatedAt: updatedAt,
      },
    };
    try {
      await ddbClient.send(new PutCommand(params));
      return [];
    } catch (e) {
      console.error(e);
      return ['UUID collision'];
    }
  }

  async updateTranscript ({ userId, id, title, partsKey, partsOrder, preview, createdAt, updatedAt }) {
    const attributes = {
      title,
      partsKey,
      partsOrder,
      preview,
      transcriptCreatedAt: createdAt,
      transcriptUpdatedAt: updatedAt,
    };
    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } = buildUpdateExpression(attributes);

    const params = {
      TableName: this.tableName,
      Key: {
        pk: `userTranscripts#${userId}`,
        sk: `transcript#${id}`,
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

  async deleteTranscript ({ userId, id }) {
    const params = {
      TableName: this.tableName,
      Key: {
        pk: `userTranscripts#${userId}`,
        sk: `transcript#${id}`,
      },
    };
    try {
      await ddbClient.send(new DeleteCommand(params));
      return [];
    } catch (e) {
      console.error(e);
      return ['Delete failed'];
    }
  }
}

const transcribeDynamoDao = new TranscribeDynamoDao(environment.DDB_MAIN_TABLE);

export { TranscribeDynamoDao, transcribeDynamoDao };