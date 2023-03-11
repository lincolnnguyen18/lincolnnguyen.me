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

  type Transcript {
      id: ID!
      title: String!
      preview: String!
      createdAt: String!
      updatedAt: String!
      partsOrder: [String]!
      partsKey: String!
  }

  extend type Mutation {
      # transcribe
      putTranscript(input: PutTranscriptInput!): [String!]!
      updateTranscript(input: PutTranscriptInput!): [String!]!
      deleteTranscript(id: ID!): [String!]!
  }
`;

const transcribeResolvers = {
  Mutation: {
    putTranscript: async (_, { input }, { id: userId }) => {
      const errors = validateAuthenticated(userId);
      if (errors.length > 0) return errors;
      const { id, title, preview, createdAt, updatedAt, partsOrder, partsKey } = input;
      return transcribeDynamoDao.putTranscript({
        userId,
        id,
        title,
        partsKey,
        partsOrder,
        preview,
        createdAt,
        updatedAt,
      });
    },
    updateTranscript: async (_, { input }, { id: userId }) => {
      const errors = validateAuthenticated(userId);
      if (errors.length > 0) return errors;
      const { id, title, preview, createdAt, updatedAt, partsOrder, partsKey } = input;
      return transcribeDynamoDao.updateTranscript({
        userId,
        id,
        title,
        partsKey,
        partsOrder,
        preview,
        createdAt,
        updatedAt,
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
