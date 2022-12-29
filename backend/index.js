import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { sharedResolvers, sharedTypeDefs } from './shared/sharedSchema.js';
import { getIdFromSessionToken } from './shared/utils/sharedUtils.js';
dotenv.config();

// app.use('/graphql', graphqlHTTP(async (req) => {
//   const authorization = req.headers.authorization;
//   // console.log('authorization', authorization);
//   const sessionToken = authorization && authorization.split(' ')[1];
//   // console.log('sessionToken', sessionToken);
//
//   let context;
//   if (sessionToken) {
//     try {
//       const userData = await sharedDao.getUserDataBySessionToken(sessionToken);
//       // console.log('userData', userData);
//       context = { userData };
//     } catch (err) {
//       console.error(err);
//       context = {};
//     }
//   }
//
//   return {
//     schema: sharedTypeDefs,
//     rootValue: sharedResolvers,
//     graphiql: true,
//     context,
//   };
// }));

const server = new ApolloServer({
  typeDefs: [sharedTypeDefs],
  resolvers: [sharedResolvers],
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const authorization = req.headers.authorization;
    // console.log('authorization', authorization);
    const sessionToken = authorization && authorization.split(' ')[1];
    // console.log('sessionToken', sessionToken);

    const id = getIdFromSessionToken(sessionToken);
    // console.log('id', id);

    return { id };
  },
  listen: { port: process.env.PORT },
});
console.log(`🚀 Server ready at ${url}`);
