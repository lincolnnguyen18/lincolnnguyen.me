import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { sharedResolvers, sharedTypeDefs } from './shared/sharedSchema.js';
import { getIdFromSessionToken } from './shared/utils/sharedUtils.js';
import { speechchatResolvers, speechchatTypeDefs } from './speech-chat/speechchatSchema.js';
dotenv.config();

const server = new ApolloServer({
  typeDefs: [sharedTypeDefs, speechchatTypeDefs],
  resolvers: [sharedResolvers, speechchatResolvers],
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const authorization = req.headers.authorization;
    const sessionToken = authorization && authorization.split(' ')[1];
    const id = getIdFromSessionToken(sessionToken);
    return { id };
  },
  listen: { port: process.env.PORT },
});
console.log(`🚀 Server ready at ${url}`);
