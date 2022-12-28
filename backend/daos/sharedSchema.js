import { buildSchema, GraphQLScalarType } from 'graphql';
import { gql } from 'graphql-request';
import { sharedDao } from './sharedDao.js';

const sharedTypeDefs = buildSchema(gql`
  scalar UnixDate
  
  type Shared {
      userData(googleToken: String, sessionToken: String): UserData
  }
  
  type UserData {
      picture: String
      email: String
      familyName: String
      givenName: String
      lastLogin: UnixDate
      sessionToken: String
  }
  
  type Query {
      shared: Shared
  }
`);

const unixDateScalar = new GraphQLScalarType({
  name: 'UnixDate',
  description: 'Unix date custom scalar type',
  parseValue (value) {
    return value.getTime().toString();
  },
  serialize (value) {
    return new Date(value);
  },
});

const sharedResolvers = {
  UnixDate: unixDateScalar,
  shared: () => {
    return {
      userData: async ({ googleToken, sessionToken }) => {
        if (sessionToken) {
          return sharedDao.getUserDataBySessionToken(sessionToken);
        } else {
          console.log('googleToken', googleToken);
          return sharedDao.getUserDataByGoogleJwt(googleToken);
        }
      },
    };
  },
};

export { sharedTypeDefs, unixDateScalar, sharedResolvers };
