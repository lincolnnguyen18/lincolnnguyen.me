import { dumpTable, parseTranscripts, parseUsers } from './replication';
import dump from './lincolnnguyen-prod.json';
import { userSqlDao } from '../daos/userSqlDao';
import { transcribeSqlDao } from '../daos/transcribeSqlDao';

describe('Replication', () => {
  it('should replicate a document', async () => {
    dumpTable('lincolnnguyen-prod');
  });

  it('parseUsers', async () => {
    const users = parseUsers(dump);
    for (const user of users) {
      // console.log(user);
      userSqlDao.putUser(user);
    }
  });

  it('parseTranscripts', async () => {
    const transcripts = parseTranscripts(dump);
    // console.log(transcripts);
    for (const transcript of transcripts) {
      // console.log(transcript);
      transcribeSqlDao.putTranscript(transcript);
    };
  });
});
