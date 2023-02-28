import { putUserRecord } from './testData.js';
import { ddbStreamRecordHandler, putUserHandler } from './ddbStreamRecordHandler.js';

describe('ddbStreamRecordHandler', () => {
  it('putUser', async () => {
    const res = await ddbStreamRecordHandler.handle(putUserRecord);
    console.log('res', res);
  });
});

describe('handlers', () => {
  it('putUser', async () => {
    const res = await putUserHandler(putUserRecord);
    console.log('res', res);
  });
});
