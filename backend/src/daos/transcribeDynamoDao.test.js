import { uuid } from '../common/stringUtils.js';
import { transcribeDynamoDao } from './transcribeDynamoDao.js';

describe('transcribeDao', () => {
  it('putTranscript', async () => {
    const res = await transcribeDynamoDao.putTranscript({
      userId: '8f8365ea-baa0-4a77-80c4-f3da3778d797',
      id: uuid(),
      title: 'Untitled Transcript',
      partsUrl: 'https://s3.amazonaws.com/lingua-transcribe-dev/8f8365ea-baa0-4a77-80c4-f3da3778d797/36ccd993-2191-426f-afa5-ca30e466e7cc.json',
      partsOrder: ['36ccd993-2191-426f-afa5-ca30e466e7cc'],
      preview: '明日の2巻です今日二十四節気の一つということであるがどんどん進んでいきますけれども (Tomorrow\'s volume 2 is one of the twenty-four solar terms today, but it\'s progressing steadily.) ',
      timestamp: new Date().toISOString(),
    });
    console.log('res', res);
  });

  // it('getIdFromUsername', async () => {
  //   const res = await userDynamoDao.getIdFromUsername('username');
  //   console.log('res', res);
  // });
  //
  // it('getUserFromId', async () => {
  //   const res = await userDynamoDao.getUserFromId('3e16827b-e626-4334-9026-8dc544445114');
  //   console.log('res', res);
  // });
  //
  // it('deleteUserById', async () => {
  //   const res = await userDynamoDao.deleteUserById('b0323876-a712-45a5-8897-6900663173b9');
  //   console.log('res', res);
  // });
});
