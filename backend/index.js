import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { sharedResolvers, sharedTypeDefs } from './apps/shared/sharedSchema.js';
import { getIdFromSessionToken } from './apps/shared/utils/sharedUtils.js';
import { messagesResolvers, messagesTypeDefs } from './apps/messages/messagesSchema.js';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const server = new ApolloServer({
  typeDefs: [sharedTypeDefs, messagesTypeDefs],
  resolvers: [sharedResolvers, messagesResolvers],
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
