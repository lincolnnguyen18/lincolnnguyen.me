import { uuid } from '../common/stringUtils.js';
import { userSqlDao } from './userSqlDao.js';

describe('userSqlDao', () => {
  it('putUser', async () => {
    const timestamp = new Date().toISOString();
    const res = await userSqlDao.putUser({
      id: uuid(),
      username: 'username',
      password: 'password',
      transcriptCreatedAt: timestamp,
      transcriptUpdatedAt: timestamp,
    });
    console.log('res', res);
  });

  it('getUserTranscripts', async () => {
    const userId = '8f8365ea-baa0-4a77-80c4-f3da3778d797';
    const res = await userSqlDao.getUserTranscripts(userId);
    console.log('res', res);
  });
});
