import { prismaClient } from '../common/clients.mjs';

class UserSqlDao {
  async putUser ({ id, username, password, playbackSpeed = 1, transcribeLang = 'Japanese', translateLang = 'English (United States)', createdAt, updatedAt }) {
    return prismaClient.user.create({
      data: {
        id,
        username,
        password,
        playbackSpeed,
        transcribeLang,
        translateLang,
        createdAt,
        updatedAt,
      },
    });
  }
}

const userSqlDao = new UserSqlDao();

export { UserSqlDao, userSqlDao };
