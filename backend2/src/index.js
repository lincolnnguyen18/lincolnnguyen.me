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
        transcripts: [Transcript!]!
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

    type Error {
        field: [String!]!
        message: String!
    }
    
    type Query {
        # returns user or null if ctx.id is invalid
        user: User
        # returns a session token or null if login fails
        login(username: String!, password: String!): String
    }
    
    type Mutation {
        # username: username already taken
        # password, confirmPassword: passwords do not match
        register(username: String!, password: String!, confirmPassword: String!): [Error!]!
    }
`;

const resolvers = {
  Query: {
    // parent, args, ctx, info
    user: async (_, __, { id }) => {
      if (!id) throw new Error('Unauthorized');
      return null;
    },
    login: async () => {
      return null;
    },
  },
  Mutation: {
    register: async (_, args) => {
      // const { username, password, confirmPassword } = args;
      console.log(args);
      return [];
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
