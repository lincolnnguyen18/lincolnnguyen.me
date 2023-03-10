import { uuid } from '../common/stringUtils.js';
import { transcribeSqlDao } from './transcribeSqlDao.js';

describe('transcribeSqlDao', () => {
  it('putTranscript', async () => {
    const timestamp = new Date().toISOString();
    const res = await transcribeSqlDao.putTranscript({
      userId: '8f8365ea-baa0-4a77-80c4-f3da3778d797',
      id: uuid(),
      title: 'Untitled Transcript',
      partsKey: 'https://s3.amazonaws.com/lingua-transcribe-dev/8f8365ea-baa0-4a77-80c4-f3da3778d797/36ccd993-2191-426f-afa5-ca30e466e7cc.json',
      partsOrder: ['36ccd993-2191-426f-afa5-ca30e466e7cc'],
      preview: '明日の2巻です今日二十四節気の一つということであるがどんどん進んでいきますけれども (Tomorrow\'s volume 2 is one of the twenty-four solar terms today, but it\'s progressing steadily.) ',
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    console.log('res', res);
  });
});
