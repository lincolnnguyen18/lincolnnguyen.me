import { ddbClient } from '../common/clients.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { environment } from '../common/environment.js';

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

  async putTranscript ({ userId, id, title, partsUrl, partsOrder, preview, timestamp = new Date().toISOString() }) {
    const params = {
      TableName: this.tableName,
      Item: {
        pk: `userTranscripts#${userId}`,
        sk: `transcript#${id}`,
        title,
        partsUrl,
        partsOrder,
        preview,
        transcriptCreatedAt: timestamp,
        transcriptUpdatedAt: timestamp,
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
}

const transcribeDynamoDao = new TranscribeDynamoDao(environment.DDB_MAIN_TABLE);

export { TranscribeDynamoDao, transcribeDynamoDao };
