import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { environment } from './common/environment.js';
import { userDynamoDao } from './daos/userDynamoDao.js';
import { uuid } from './common/stringUtils.js';
import { validatePutUser } from './common/validators.js';
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
        transcripts: [Transcript!]!
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

    type Error {
        field: [String!]!
        message: String!
    }
    
    type Query {
        # returns user or null if ctx.id is invalid
        user: User
        # returns a session token or null if login fails
        login(username: String!, password: String!): String
    }
    
    type Mutation {
        # username: username already taken
        # password, confirmPassword: passwords do not match
        register(username: String!, password: String!, confirmPassword: String!): [Error!]!
    }
`;

const resolvers = {
  Query: {
    // parent, args, ctx, info
    user: async (_, __, { id }) => {
      if (!id) return null;
      const user = await userDynamoDao.getUserFromId(id);
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
  },
  Mutation: {
    register: async (_, user) => {
      const { username, password } = user;
      const errors = validatePutUser(user);
      if (errors.length > 0) return errors;

      return userDynamoDao.putUser({
        id: uuid(),
        username,
        password,
      });
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
