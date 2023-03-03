import { environment } from './environment.js';
import { GraphQLClient } from 'graphql-request';

const gqlClient = new GraphQLClient(environment.GRAPHQL_URL);
if (process.env.NODE_ENV === 'test') {
  gqlClient.setHeader('Authorization', environment.GRAPHQL_AUTHORIZATION);
}

export { gqlClient };
