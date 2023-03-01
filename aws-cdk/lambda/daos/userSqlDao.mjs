import { prismaClient } from '../common/clients.mjs';

class UserSqlDao {
  async putUser ({ id, username, password, playbackSpeed, transcribeLang, translateLang, createdAt, updatedAt }) {
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

  async deleteUser (id) {
    return prismaClient.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUser ({ id, username, password, playbackSpeed, transcribeLang, translateLang, createdAt, updatedAt }) {
    return prismaClient.user.update({
      where: {
        id,
      },
      data: {
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
