import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { environment } from '../common/environment.js';
import { userDynamoDao } from '../daos/userDynamoDao.js';
import { fileDao } from '../daos/fileDao.js';
import { validateAuthenticated, validatePutUser, validateUpdateUser } from '../common/validators.js';
import { uuid } from '../common/stringUtils.js';

const schemaPath = './src/gql/user.gql';
const userTypedef = fs.readFileSync(path.resolve(schemaPath), 'utf8');

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
    convertWebmAudioToM4a: async (_, { s3ObjectKey }, { id }) => {
      if (!id) return null;
      s3ObjectKey = `${id}/${s3ObjectKey}`;

      async function startConversion () {
        console.log('starting conversion');
        // await wait(10000);
        await fileDao.convertWebmAudioToM4a(s3ObjectKey);
      }
      startConversion();

      return [];
    },
  },
};

export { userTypedef, userResolvers };
