import { unmarshall } from '@aws-sdk/util-dynamodb';
import { ddbStreamRecordHandler } from './common/ddbStreamRecordHandler.mjs';

export async function handler (event) {
  for (const record of event.Records) {
    try {
      console.log('Event Id: %s', record.eventID);
      console.log('Event Name: %s', record.eventName);
      const unmarshalledRecord = unmarshall(record.dynamodb.NewImage);
      console.log('DynamoDB Record: %j', unmarshalledRecord);
      await ddbStreamRecordHandler.handle({ eventName: record.eventName, record: unmarshalledRecord });
    } catch (error) {
      console.error(`Error processing record with event ID ${record.eventID}: ${error.message}`);
    }
  }
}