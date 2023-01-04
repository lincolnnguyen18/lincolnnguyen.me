import { speechchatDao } from './speechchatDao.js';
import { sharedDao } from '../shared/sharedDao.js';
import { GraphQLError } from 'graphql';

// language=GraphQL
const speechchatTypeDefs = `
  type SpeechChat {
      contact(contactId: ID!): Contact
      contacts: PaginatedContacts
  }
  
  type Contact {
      id: ID
      picture: String
      email: String
      familyName: String
      givenName: String
      updatedAt: Float
      messages(limit: Int = 30, nextToken: String): PaginatedMessages
      lastMessage: Message
      call(callId: String): Call
  }
  
  type Message {
      type: String
      direction: String
      createdAt: Float
      text: String
      imageUrl: String
      callId: ID
  }
  
  type PaginatedMessages {
      messages: [Message]
      nextToken: String
  }
  
  type PaginatedContacts {
      contacts: [Contact]
      nextToken: String
  }
  
  type Call {
      id: ID
      duration: Int
      createdAt: Float
      messages: [Message]
  }

  extend type Query {
      speechChat: SpeechChat
  }
  
  type Mutation {
      addConnection(receiverUserId: ID!): Boolean
      sendMessage(receiverUserId: ID!, text: String): Boolean
  }
`;

const speechchatResolvers = {
  Query: {
    speechChat: async (_, __, { id }) => {
      if (!id) throw new GraphQLError('Unauthorized');
      return {};
    },
  },
  SpeechChat: {
    contacts: async (_, { limit, lastKey }, { id }) => {
      // console.log('id', id);
      return speechchatDao.getContacts(id, { limit, lastKey });
    },
    contact: async (_, { contactId }, { id }) => {
      if (!id) throw new GraphQLError('Unauthorized');
      return sharedDao.getUserById(contactId);
    },
  },
  Contact: {
    messages: async ({ id: contactId }, { limit, nextToken }, { id }) => {
      return speechchatDao.getMessages(id, contactId, { limit, nextToken });
    },
    lastMessage: async ({ id: contactId }, _, { id }) => {
      const res = await speechchatDao.getMessages(id, contactId, { limit: 1 });
      // console.log('res', res);
      return res.messages[0];
    },
  },
  Mutation: {
    addConnection: async (_, args, { id }) => {
      if (!id) throw new GraphQLError('Unauthorized');
      const { receiverUserId } = args;
      await speechchatDao.addConnection({ initiatorUserId: id, receiverUserId, timestamp: Date.now() });
      return true;
    },
    sendMessage: async (_, args, { id }) => {
      if (!id) throw new GraphQLError('Unauthorized');
      const { receiverUserId, text } = args;
      await speechchatDao.addMessage({ senderUserId: id, receiverUserId, type: 'text', text, createdAt: Date.now() });
      return true;
    },
  },
};

export { speechchatTypeDefs, speechchatResolvers };
