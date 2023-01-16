import { messagesDao } from './messagesDao.js';
import { sharedDao } from '../shared/sharedDao.js';
import { wait } from '../shared/utils/sharedUtils.js';

// language=GraphQL
const messagesTypeDefs = `
  type Messages {
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
      createdAt: Float
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
      messages: Messages
  }
  
  type Mutation {
      addConnection(receiverEmail: String!): [Error]
      sendMessage(receiverUserId: ID!, text: String): [Error]
  }
`;

const messagesResolvers = {
  Query: {
    messages: async (_, __, { id }) => {
      if (!id) throw new Error('Unauthorized');
      return {};
    },
  },
  Messages: {
    contacts: async (_, { limit, lastKey }, { id }) => {
      // console.log('id', id);
      await wait(200);
      return messagesDao.getContacts(id, { limit, lastKey });
    },
    contact: async (_, { contactId }, { id }) => {
      if (!id) throw new Error('Unauthorized');
      return sharedDao.getUserById(contactId);
    },
  },
  Contact: {
    messages: async ({ id: contactId }, { limit, nextToken }, { id }) => {
      return messagesDao.getMessages(id, contactId, { limit, nextToken });
    },
    lastMessage: async ({ id: contactId }, _, { id }) => {
      const res = await messagesDao.getMessages(id, contactId, { limit: 1 });
      // console.log('res', res);
      return res.messages[0];
    },
  },
  Mutation: {
    addConnection: async (_, args, { id }) => {
      if (!id) throw new Error('Unauthorized');
      const { receiverEmail } = args;
      console.log('receiverEmail', receiverEmail);
      const receiverUserId = await sharedDao.getIdFromEmail(receiverEmail);
      console.log('receiverUserId', receiverUserId);
      try {
        await messagesDao.addConnection({ initiatorUserId: id, receiverUserId, timestamp: Date.now() });
        return [];
      } catch (e) {
        return [{ field: 'primary', message: e.message }];
      }
    },
    sendMessage: async (_, args, { id }) => {
      if (!id) throw new Error('Unauthorized');
      const { receiverUserId, text } = args;
      try {
        await messagesDao.addMessage({ senderUserId: id, receiverUserId, type: 'text', text, createdAt: Date.now() });
      } catch (e) {
        return [{ field: 'primary', message: e.message }];
      }
    },
  },
};

export { messagesTypeDefs, messagesResolvers };
