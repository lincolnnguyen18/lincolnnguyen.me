import { uuid } from '../common/stringUtils.js';
import { transcribeDynamoDao } from './transcribeDynamoDao.js';

describe('transcribeDao', () => {
  it('putTranscript', async () => {
    const timestamp = new Date().toISOString();
    const res = await transcribeDynamoDao.putTranscript({
      userId: 'f218335b-f82b-4009-adba-e254832665e8',
      id: uuid(),
      title: 'Old title',
      partsKey: 'https://s3.amazonaws.com/lingua-transcribe-dev/8f8365ea-baa0-4a77-80c4-f3da3778d797/36ccd993-2191-426f-afa5-ca30e466e7cc.json',
      partsOrder: ['36ccd993-2191-426f-afa5-ca30e466e7cc'],
      preview: '明日の2巻です今日二十四節気の一つということであるがどんどん進んでいきますけれども (Tomorrow\'s volume 2 is one of the twenty-four solar terms today, but it\'s progressing steadily.) ',
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    console.log('res', res);
  });

  it('updateTranscript', async () => {
    const res = await transcribeDynamoDao.updateTranscript({
      userId: 'f218335b-f82b-4009-adba-e254832665e8',
      id: '46aa3b2e-2b97-40e2-828d-de3d43eecb19',
      title: 'New title',
    });
    console.log('res', res);
  });

  it('deleteTranscript', async () => {
    const res = await transcribeDynamoDao.deleteTranscript({
      userId: 'f218335b-f82b-4009-adba-e254832665e8',
      id: '3b5f99ed-5b97-4ae5-b727-457243d55d28',
    });
    console.log('res', res);
  });
});
