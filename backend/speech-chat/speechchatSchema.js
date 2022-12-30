// language=GraphQL
const speechchatTypeDefs = `
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
`;

const speechchatResolvers = {
};

export { speechchatTypeDefs, speechchatResolvers };
