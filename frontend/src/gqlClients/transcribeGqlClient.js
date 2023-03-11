import { gql } from 'graphql-request';
import { gqlClient } from '../common/clients';

class TranscribeGqlClient {
  async putTranscript ({ id, title, preview, createdAt, updatedAt, partsOrder, partsKey }) {
    const mutation = gql`
      mutation ($id: ID!, $title: String!, $preview: String!, $createdAt: String!, $updatedAt: String!, $partsOrder: [String]!, $partsKey: String!) {
        putTranscript(input: { id: $id, title: $title, preview: $preview, createdAt: $createdAt, updatedAt: $updatedAt, partsOrder: $partsOrder, partsKey: $partsKey })
      }
    `;
    const variables = {
      id,
      title,
      preview,
      createdAt,
      updatedAt,
      partsOrder,
      partsKey,
    };
    const res = await gqlClient.request(mutation, variables);
    return res.putTranscript;
  }

  async updateTranscript ({ id, title, preview, createdAt, updatedAt, partsOrder, partsKey }) {
    const mutation = gql`
      mutation ($id: ID!, $title: String!, $preview: String!, $createdAt: String!, $updatedAt: String!, $partsOrder: [String]!, $partsKey: String!) {
        updateTranscript(input: { id: $id, title: $title, preview: $preview, createdAt: $createdAt, updatedAt: $updatedAt, partsOrder: $partsOrder, partsKey: $partsKey })
      }
    `;
    const variables = {
      id,
      title,
      preview,
      createdAt,
      updatedAt,
      partsOrder,
      partsKey,
    };
    const res = await gqlClient.request(mutation, variables);
    return res.updateTranscript;
  }

  async deleteTranscript ({ id }) {
    const mutation = gql`
      mutation ($id: ID!) {
        deleteTranscript(id: $id)
      }
    `;
    const variables = {
      id,
    };
    const res = await gqlClient.request(mutation, variables);
    return res.deleteTranscript;
  }
}

const transcribeGqlClient = new TranscribeGqlClient();

export { TranscribeGqlClient, transcribeGqlClient };
