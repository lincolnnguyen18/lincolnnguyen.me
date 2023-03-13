import { environment } from '../common/environment.js';
import { userDynamoDao } from '../daos/userDynamoDao.js';
import { fileDao } from '../daos/fileDao.js';
import { validateAuthenticated, validatePutUser, validateUpdateUser } from '../common/validators.js';
import { uuid } from '../common/stringUtils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// language=GraphQL
const userTypedef = `
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

  type Query {
      # no auth required
      login(username: String!, password: String!): String
      version: String!

      # auth required
      user: User
      uploadFile(s3ObjectKey: String!): String
      getFile(s3ObjectKey: String!): String
      getFileDirect(s3ObjectKey: String!): String
  }

  type Mutation {
      # no auth required
      register(username: String!, password: String!, confirmPassword: String!): [String!]!

      # auth required
      updateUser(input: UpdateUserInput!): [String!]!
  }
`;

const userResolvers = {
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
    getFileDirect: async (_, { s3ObjectKey }, { id }) => {
      if (!id) return null;
      s3ObjectKey = `${id}/${s3ObjectKey}`;
      return fileDao.getFileDirect(s3ObjectKey);
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

      return userDynamoDao.updateUser({
        id,
        ...input,
      });
    },
  },
};

export { userTypedef, userResolvers };
