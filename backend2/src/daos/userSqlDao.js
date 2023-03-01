import { prismaClient } from '../common/clients.js';

class UserSqlDao {
  async putUser ({ id, username, password, playbackSpeed = 1, transcribeLang = 'Japanese', translateLang = 'English (United States)', timestamp = new Date().toISOString() }) {
    return prismaClient.user.create({
      data: {
        id,
        username,
        password,
        playbackSpeed,
        transcribeLang,
        translateLang,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });
  }
}

const userSqlDao = new UserSqlDao();

export { UserSqlDao, userSqlDao };
