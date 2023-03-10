import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { environment } from './common/environment.js';
import { userDynamoDao } from './daos/userDynamoDao.js';
import { uuid } from './common/stringUtils.js';
import { validateAuthenticated, validatePutUser, validateUpdateUser } from './common/validators.js';
import { fileDao } from './daos/fileDao.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { transcribeDynamoDao } from './daos/transcribeDynamoDao.js';

// language=GraphQL
const typeDefs = `
    type User {
        id: ID!
        username: String!
        password: String!
        createdAt: String!
        updatedAt: String!

        # transcribe
        playbackSpeed: Float!
        translateLang: String!
        transcribeLang: String!
        transcribeCutOffType: String!
        transcripts: [Transcript!]!
    }
    
    input UpdateUserInput {
        username: String
        password: String
        
        # transcribe
        playbackSpeed: Float
        translateLang: String
        transcribeLang: String
        transcribeCutOffType: String
    }
    
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
    
    type Query {
        # no auth required
        login(username: String!, password: String!): String
        version: String!
        
        # auth required
        user: User
        uploadFile(s3ObjectKey: String!): String
        getFile(s3ObjectKey: String!): String
    }
    
    type Mutation {
        # no auth required
        register(username: String!, password: String!, confirmPassword: String!): [String!]!
        
        # auth required
        updateUser(input: UpdateUserInput!): [String!]!
        # transcribe
        putTranscript(input: PutTranscriptInput!): [String!]!
        updateTranscript(input: PutTranscriptInput!): [String!]!
    }
`;

const resolvers = {
  Query: {
    // parent, args, ctx, info
    version: () => environment.VERSION,
    user: async (_, __, { id }) => {
      if (!id) return null;
      const user = await userDynamoDao.getUserFromId(id);
      if (!user) return null;
      user.transcripts = [];
      return user;
    },
    login: async (_, { username, password }) => {
      const id = await userDynamoDao.getIdFromUsername(username);
      if (!id) return null;

      const user = await userDynamoDao.getUserFromId(id);
      if (!user) return null;

      const match = bcrypt.compareSync(password, user.password);
      if (!match) return null;

      return jwt.sign({ id }, environment.JWT_SECRET);
    },
    uploadFile: async (_, { s3ObjectKey }, { id }) => {
      if (!id) return null;
      s3ObjectKey = `${id}/${s3ObjectKey}`;
      return fileDao.putFile(s3ObjectKey);
    },
    getFile: async (_, { s3ObjectKey }, { id }) => {
      if (!id) return null;
      s3ObjectKey = `${id}/${s3ObjectKey}`;
      return fileDao.getFile(s3ObjectKey);
    },
  },
  Mutation: {
    register: async (_, user) => {
      const errors = validatePutUser(user);
      if (errors.length > 0) return errors;

      const { username, password } = user;
      return userDynamoDao.putUser({
        id: uuid(),
        username,
        password,
      });
    },
    updateUser: async (_, { input }, { id }) => {
      let errors = validateAuthenticated(id);
      if (errors.length > 0) return errors;

      errors = validateUpdateUser(input);
      if (errors.length > 0) return errors;

      errors = await userDynamoDao.updateUser({
        id,
        ...input,
      });
      if (errors.length > 0) return errors;

      return [];
    },
    putTranscript: async (_, { input }, { id: userId }) => {
      if (!userId) return null;
      const { id, title, preview, createdAt, updatedAt, partsOrder, partsKey } = input;
      await transcribeDynamoDao.putTranscript({
        userId,
        id,
        title,
        partsKey,
        partsOrder,
        preview,
        createdAt,
        updatedAt,
      });
      return [];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(' ')[1].trim();
    if (!token) return {};
    try {
      return jwt.verify(token, environment.JWT_SECRET);
    } catch (e) {
      return {};
    }
  },
  listen: { port: environment.PORT },
});
console.log(`Server running at ${url}`);
