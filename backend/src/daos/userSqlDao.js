import { prismaClient } from '../common/clients.js';

class UserSqlDao {
  async putUser ({ id, username, password, playbackSpeed, transcribeLang, translateLang, transcribeCutOffType, createdAt, updatedAt }) {
    return prismaClient.user.create({
      data: {
        id,
        username,
        password,
        playbackSpeed,
        transcribeLang,
        translateLang,
        transcribeCutOffType,
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

  async updateUser ({ id, username, password, playbackSpeed, transcribeLang, translateLang, transcribeCutOffType, createdAt, updatedAt }) {
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
        transcribeCutOffType,
        createdAt,
        updatedAt,
      },
    });
  }

  async getUserTranscripts (userId) {
    return prismaClient.transcript.findMany({
      where: {
        userId,
      },
    });
  }
}

const userSqlDao = new UserSqlDao();

export { UserSqlDao, userSqlDao };
