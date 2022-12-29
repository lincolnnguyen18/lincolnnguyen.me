import { buildSchema, GraphQLScalarType } from 'graphql';

// language=GraphQL
const sharedTypeDefs = buildSchema(`
  type SpeechChat {
      contacts: PaginatedContacts
      messages(contactEmail: String, limit: Int = 10, nextToken: String): PaginatedMessages
      call(callId: String): Call
  }
  
  type Contact {
      picture: String
      email: String
      familyName: String
      givenName: String
      updatedAt: UnixDate
  }
  
  type Message {
      type: String
      direction: String
      createdAt: UnixDate
      text: String
      imageUrl: String
      callTimestamp: UnixDate
  }
  
  type PaginatedMessages {
      items: [Message]
      nextToken: String
  }
  
  type PaginatedContacts {
      items: [Contact]
      nextToken: String
  }
  
  type Call {
      callId: String
      duration: Int
      createdAt: UnixDate
      messages: [Message]
  }

  extend type Query {
      speechChat: SpeechChat
  }
`);

const UnixDate = new GraphQLScalarType({
  name: 'UnixDate',
  description: 'Unix date custom scalar type',
  parseValue (value) {
    return value.getTime();
  },
  serialize (value) {
    return new Date(value);
  },
  parseLiteral (ast) {
    return new Date(ast.value);
  },
});

// const mockUser = {
//   picture: 'pictureLink',
//   email: 'email',
//   familyName: 'familyName',
//   givenName: 'givenName',
//   lastLogin: new Date(),
// };
//
// const mockContacts = [
//   {
//     picture: 'pictureLink',
//     email: 'email1',
//     familyName: 'familyName',
//     givenName: 'givenName',
//     lastLogin: new Date(),
//
//   }
// ]

const sharedResolvers = {
  Query: {
    user: async (_, __, ___) => {
    },
  },
  UnixDate,
};

export { sharedTypeDefs, sharedResolvers };
