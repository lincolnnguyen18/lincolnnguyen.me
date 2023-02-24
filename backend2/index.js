import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { environment } from './common/environment.js';

// language=GraphQL
const typeDefs = `
    type User {
        id: ID!
        username: String!
        password: String!

        # transcribe
        playbackSpeed: Float!
        translateLang: String!
        transcribeLang: String!
        transcripts: [Transcript]!
    }

    type Transcript {
        id: ID!
        title: String!
        preview: String!
        createdAt: String!
        updatedAt: String!
        partsUrl: String!
        partsOrder: [String]!
    }
    
    type Query {
        user(id: ID!): User
    }
`;

const resolvers = {
  Query: {
    // parent, args, ctx, info
    user: async (_, args, ctx) => {
      console.log('ctx', ctx);
      return null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const authorization = req.headers.authorization;
    const bearer = authorization && authorization.split(' ')[1].trim();
    console.log(`bearer = ${bearer}`);
    return {};
  },
  listen: { port: environment.PORT },
});
console.log(`Server running at ${url}`);
