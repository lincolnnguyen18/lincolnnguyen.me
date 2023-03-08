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
});
