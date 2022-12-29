import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient(process.env.REACT_APP_GRAPHQL_URL);

export { graphQLClient };
