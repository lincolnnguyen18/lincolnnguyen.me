import { prismaClient } from '../common/clients.mjs';

class TranscribeSqlDao {
  async putTranscript ({ userId, id, title, partsKey, partsOrder, preview, createdAt, updatedAt }) {
    return prismaClient.transcript.create({
      data: {
        userId,
        id,
        title,
        partsKey,
        partsOrder,
        preview,
        createdAt,
        updatedAt,
      },
    });
  }

  async deleteTranscript (id) {
    return prismaClient.transcript.delete({
      where: {
        id,
      },
    });
  }

  async updateTranscript ({ id, title, partsKey, partsOrder, preview, createdAt, updatedAt }) {
    return prismaClient.transcript.update({
      where: {
        id,
      },
      data: {
        title,
        partsKey,
        partsOrder,
        preview,
        createdAt,
        updatedAt,
      },
    });
  }
}

const transcribeSqlDao = new TranscribeSqlDao();

export { TranscribeSqlDao, transcribeSqlDao };
