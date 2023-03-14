import { fileDao } from './fileDao.js';

describe('FileDao', () => {
  test('getFile', async () => {
    const s3ObjectKey = 'test.txt';
    const res = await fileDao.getFile(s3ObjectKey);
    console.log(res);
  });

  test('putFile', async () => {
    const s3ObjectKey = 'test.txt';
    const res = await fileDao.putFile(s3ObjectKey);
    console.log(res);
  });

  test('deleteFile', async () => {
    const s3ObjectKey = 'test.txt';
    const res = await fileDao.deleteFile(s3ObjectKey);
    console.log(res);
  });

  test('deleteDirectory', async () => {
    const userId = 'f218335b-f82b-4009-adba-e254832665e8';
    const transcriptId = '62a8b5f8-b389-49ab-8826-10aec97bc93e';
    const s3ObjectKey = `${userId}/transcribe/${transcriptId}`;
    const res = await fileDao.deleteDirectory(s3ObjectKey);
    console.log(res);
  });

  test('convertWebmAudioToM4a', async () => {
    const userId = 'f218335b-f82b-4009-adba-e254832665e8';
    const transcriptId = '07bf4d78-bb9e-4323-8179-98efa5877614';
    const partId = 'cf669ceb-ee79-4830-98cd-f302a897bf3c.webm';
    const s3ObjectKey = `${userId}/transcribe/${transcriptId}/${partId}`;
    const res = await fileDao.convertWebmAudioToM4a(s3ObjectKey);
    console.log(res);
  });
});
