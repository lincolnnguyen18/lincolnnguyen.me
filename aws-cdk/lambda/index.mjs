import { ddbStreamRecordHandler } from './common/ddbStreamRecordHandler.mjs';

export async function handler (event) {
  for (const record of event.Records) {
    try {
      console.log('Start processing record with event ID %s', record.eventID);
      console.log('Event Name: %s', record.eventName);
      console.log('Record: ', JSON.stringify(record));
      await ddbStreamRecordHandler.handle(record);
      console.log('Successfully processed record with event ID %s', record.eventID);
    } catch (error) {
      console.error(`Error processing record with event ID ${record.eventID}: ${error.message}`);
    }
  }
}
