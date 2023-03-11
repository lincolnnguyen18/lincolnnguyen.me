import { putUserRecord } from '../common/testData.js';
import { ddbStreamRecordHandler, putUserHandler } from '../lambda/ddbStreamRecordHandler.js';

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
