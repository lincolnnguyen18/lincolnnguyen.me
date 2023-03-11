import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { environment } from './common/environment.js';
import { transcribeResolvers, transcribeTypedef } from './gql/transcribeGql.js';
import { userResolvers, userTypedef } from './gql/userGql.js';
import jwt from 'jsonwebtoken';

const server = new ApolloServer({
  typeDefs: [userTypedef, transcribeTypedef],
  resolvers: [userResolvers, transcribeResolvers],
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
