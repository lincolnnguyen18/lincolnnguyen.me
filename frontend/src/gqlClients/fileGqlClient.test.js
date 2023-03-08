import { fileGqlClient } from './fileGqlClient';

describe('fileGqlClient', () => {
  it('uploadFile', async () => {
    const res = await fileGqlClient.uploadFile({
      s3ObjectKey: 'test.txt',
    });
    console.log(res);
  });
});
