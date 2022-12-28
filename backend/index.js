import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
import { sharedResolvers, sharedTypeDefs } from './daos/sharedSchema.js';
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: process.env.CLIENT_ORIGIN } });

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/graphql', graphqlHTTP({
  schema: sharedTypeDefs,
  rootValue: sharedResolvers,
  graphiql: true,
}));

httpServer.listen(process.env.PORT, () => {
  console.info(`Socket.IO server running at http://localhost:${process.env.PORT}/`);
});
