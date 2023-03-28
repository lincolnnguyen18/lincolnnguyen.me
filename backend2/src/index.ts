import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { environment } from '../common/environment';

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const app = express();
const httpServer = http.createServer(app);
const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


app.get('/', (req, res) => {
  res.send(`Version 1, code: ${code}`);
});

async function startApolloServer () {
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    express.json(),
    expressMiddleware(server),
  );

  // Start the server
  const port = environment.PORT;
  await httpServer.listen({ port });
  console.log(`🚀 Server ready at http://localhost:${port}`);
}

startApolloServer();
