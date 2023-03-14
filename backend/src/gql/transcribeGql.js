import { validateAuthenticated } from '../common/validators.js';
import { transcribeDynamoDao } from '../daos/transcribeDynamoDao.js';

// language=GraphQL
const transcribeTypedef = `
    input PutTranscriptInput {
        id: ID!
        title: String!
        preview: String!
        createdAt: String!
        updatedAt: String!
        partsOrder: [String]!
        partsKey: String!
    }

    input UpdateTranscriptInput {
        id: ID!
        title: String
        preview: String
        createdAt: String
        updatedAt: String!
        partsOrder: [String]
        partsKey: String
        version: Int!
    }

    input SearchTranscriptsInput {
        search: String
        skip: Int = 0
        take: Int = 10
    }

    input ListTranscriptsInput {
        lastEvaluatedKey: String
        limit: Int = 10
        scanIndexForward: Boolean = false
    }

    type Transcript {
        id: ID!
        title: String!
        preview: String!
        createdAt: String!
        updatedAt: String!
        partsOrder: [String]!
        partsKey: String!
        version: Int!
    }

    type TranscriptPreview {
        id: ID!
        title: String!
        preview: String!
        createdAt: String!
        updatedAt: String!
    }

    type ListTranscriptResults {
        items: [TranscriptPreview!]!
        lastEvaluatedKey: String
    }

    extend type Query {
        searchTranscripts(input: SearchTranscriptsInput!): [TranscriptPreview!]
        listTranscripts(input: ListTranscriptsInput!): ListTranscriptResults
        getTranscript(id: ID!): Transcript
    }

    extend type Mutation {
        # transcribe
        putTranscript(input: PutTranscriptInput!): [String!]!
        updateTranscript(input: UpdateTranscriptInput!): [String!]!
        deleteTranscript(id: ID!): [String!]!
    }
`;

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
