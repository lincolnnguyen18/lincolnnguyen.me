import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { environment } from './common/environment.js';
import { userDynamoDao } from './daos/userDynamoDao.js';
import { uuid } from './common/stringUtils.js';
import { validateAuthenticated, validatePutUser, validateUpdateUser } from './common/validators.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

    type Transcript {
        id: ID!
        title: String!
        preview: String!
        createdAt: String!
        updatedAt: String!
        partsUrl: String!
        partsOrder: [String]!
    }
    
    type Query {
        # no auth required
        login(username: String!, password: String!): String
        version: String!
        
        # auth required
        user: User
    }
    
    type Mutation {
        # no auth required
        register(username: String!, password: String!, confirmPassword: String!): [String!]!
        
        # auth required
        updateUser(input: UpdateUserInput!): [String!]!
    }
`;

const resolvers = {
  Query: {
    // parent, args, ctx, info
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
    version: () => environment.VERSION,
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
