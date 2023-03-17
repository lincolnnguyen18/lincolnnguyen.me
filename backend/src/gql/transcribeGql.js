import fs from 'fs';
import path from 'path';
import { validateAuthenticated } from '../common/validators.js';
import { transcribeDynamoDao } from '../daos/transcribeDynamoDao.js';

const schemaPath = './src/gql/transcribe.gql';
const transcribeTypedef = fs.readFileSync(path.resolve(schemaPath), 'utf8');

const transcribeResolvers = {
  Query: {
    listTranscripts: async (_, { input }, { id: userId }) => {
      if (!userId) return null;
      let { lastEvaluatedKey, limit, scanIndexForward } = input;
      lastEvaluatedKey = lastEvaluatedKey ? JSON.parse(lastEvaluatedKey) : null;
      return transcribeDynamoDao.listTranscripts({ userId, lastEvaluatedKey, limit, scanIndexForward });
    },
    getTranscript: async (_, { id }, { id: userId }) => {
      if (!userId) return null;
      // await wait(3000);
      return transcribeDynamoDao.getTranscript({ userId, id });
    },
    // searchTranscripts: async (_, { input }, { id: userId }) => {
    //   const errors = validateAuthenticated(userId);
    //   if (errors.length > 0) return errors;
    //   const { search, lastEvaluatedKey } = input;
    //   return transcribeDynamoDao.searchTranscripts({ userId, title, lastEvaluatedKey });
    // },
  },
  Mutation: {
    putTranscript: async (_, { input }, { id: userId }) => {
      const errors = validateAuthenticated(userId);
      if (errors.length > 0) return errors;
      const { id, title, preview, createdAt, updatedAt, partsOrder, partsKey } = input;
      if (partsOrder.length === 0) return ['Parts order must not be empty'];
      if (partsOrder.length > 100) return ['Parts order must not be greater than 100'];
      return transcribeDynamoDao.putTranscript({
        userId,
        id,
        title,
        partsKey,
        partsOrder,
        preview,
        createdAt,
        updatedAt,
        version: 0,
      });
    },
    updateTranscript: async (_, { input }, { id: userId }) => {
      const errors = validateAuthenticated(userId);
      if (errors.length > 0) return errors;
      const { id, title, preview, createdAt, updatedAt, partsOrder, partsKey, version } = input;
      if (partsOrder.length > 100) return ['Parts order must not be greater than 100'];
      return transcribeDynamoDao.updateTranscript({
        userId,
        id,
        title,
        partsKey,
        partsOrder,
        preview,
        createdAt,
        updatedAt,
        version,
      });
    },
    deleteTranscript: async (_, { id }, { id: userId }) => {
      const errors = validateAuthenticated(userId);
      if (errors.length > 0) return errors;
      return transcribeDynamoDao.deleteTranscript({ userId, id });
    },
  },
};

export { transcribeTypedef, transcribeResolvers };
