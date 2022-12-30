import { GraphQLScalarType } from 'graphql';
import { sharedDao } from './sharedDao.js';
import { decodeGoogleToken, getSessionTokenFromId, uuid } from './utils/sharedUtils.js';

// language=GraphQL
const sharedTypeDefs = `
  scalar UnixDate
  
  type User {
      picture: String
      email: String
      familyName: String
      givenName: String
  }
  
  type Query {
      user: User
      sessionToken(googleToken: String): String
  }
`;

const UnixDate = new GraphQLScalarType({
  name: 'UnixDate',
  description: 'Unix date custom scalar type',
  parseValue (value) {
    return value.getTime();
  },
  serialize (value) {
    return new Date(value);
  },
  parseLiteral (ast) {
    return new Date(ast.value);
  },
});

const sharedResolvers = {
  Query: {
    sessionToken: async (_, args) => {
      const { googleToken } = args;
      const payload = await decodeGoogleToken(googleToken);
      console.log('payload', payload);
      const { picture, email, family_name: familyName, given_name: givenName } = payload;
      let id = await sharedDao.getIdFromEmail(email);
      if (!id) {
        const user = await sharedDao.addUser({ id: uuid(), picture, email, familyName, givenName, createdAt: Date.now().toString() });
        id = user.id;
      } else {
        await sharedDao.updateUser(id, { picture, email, familyName, givenName, updatedAt: Date.now().toString() });
      }
      return getSessionTokenFromId(id);
    },
    user: async (_, __, { id }) => {
      if (!id) throw new Error('Unauthorized');
      return sharedDao.getUserById(id);
    },
  },
  UnixDate,
};

export { sharedTypeDefs, sharedResolvers };
