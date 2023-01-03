import { sharedDao } from './sharedDao.js';
import { decodeGoogleToken, getSessionTokenFromId, uuid } from './utils/sharedUtils.js';
import { GraphQLError } from 'graphql';

// language=GraphQL
const sharedTypeDefs = `
  type User {
      id: ID
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

const sharedResolvers = {
  Query: {
    sessionToken: async (_, args) => {
      const { googleToken } = args;
      const payload = await decodeGoogleToken(googleToken);
      const { picture, email, family_name: familyName, given_name: givenName } = payload;
      let id = await sharedDao.getIdFromEmail(email);
      if (!id) {
        id = uuid();
        await sharedDao.addUser({ id, picture, email, familyName, givenName, createdAt: Date.now() });
      } else {
        await sharedDao.updateUser(id, { picture, email, familyName, givenName, updatedAt: Date.now() });
      }
      return getSessionTokenFromId(id);
    },
    user: async (_, __, { id }) => {
      if (!id) throw new GraphQLError('Unauthorized');
      return sharedDao.getUserById(id);
    },
  },
};

export { sharedTypeDefs, sharedResolvers };
