import express from 'express';
import jwt from 'jsonwebtoken';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { environment } from './common/environment.js';
import { transcribeResolvers, transcribeTypedef } from './gql/transcribeGql.js';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { userResolvers, userTypedef } from './gql/userGql.js';

const app = express();
const httpServer = http.createServer(app);

const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

app.get('/', (req, res) => {
  res.send(`Production API, code: ${code}`);
});

const server = new ApolloServer({
  typeDefs: [userTypedef, transcribeTypedef],
  resolvers: [userResolvers, transcribeResolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

async function context ({ req }) {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(' ')[1].trim();
  console.log('token', token);
  if (!token) return {};
  try {
    return jwt.verify(token, environment.JWT_SECRET);
  } catch (e) {
    return {};
  }
}

let origin = '*';

if (process.env.NODE_ENV === 'prod') {
  origin = ['https://lincolnnguyen.me', 'http://lincolnnguyen.me'];
}

const corsOptions = {
  origin,
  methods: '*',
};

app.use(
  cors(corsOptions),
  express.json(),
  expressMiddleware(server, { context }),
);

const port = environment.PORT;
await httpServer.listen({ port });
console.log(`🚀 Server ready at http://localhost:${port}`);
