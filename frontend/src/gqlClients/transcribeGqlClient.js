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

  async updateTranscript ({ id, title = undefined, preview = undefined, createdAt = undefined, updatedAt, partsOrder = undefined, partsKey = undefined, version }) {
    const mutation = gql`
      mutation ($id: ID!, $title: String, $preview: String, $createdAt: String, $updatedAt: String!, $partsOrder: [String], $partsKey: String, $version: Int!) {
        updateTranscript(input: { id: $id, title: $title, preview: $preview, createdAt: $createdAt, updatedAt: $updatedAt, partsOrder: $partsOrder, partsKey: $partsKey, version: $version })
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
      version,
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

  async listTranscripts ({ lastEvaluatedKey = undefined, limit = undefined, scanIndexForward = undefined }) {
    const query = gql`
      query ($lastEvaluatedKey: String, $limit: Int, $scanIndexForward: Boolean) {
        listTranscripts(input: { lastEvaluatedKey: $lastEvaluatedKey, limit: $limit, scanIndexForward: $scanIndexForward }) {
          items {
              id
              title
              preview
              createdAt
              updatedAt
          }
          lastEvaluatedKey
        }
      }
    `;
    const variables = {
      lastEvaluatedKey,
      limit,
      scanIndexForward,
    };
    const res = await gqlClient.request(query, variables);
    return res.listTranscripts;
  }

  async getTranscript ({ id }) {
    const query = gql`
      query ($id: ID!) {
        getTranscript(id: $id) {
          title
          preview
          createdAt
          updatedAt
          partsOrder
          partsKey
          version
        }
      }
    `;
    const variables = {
      id,
    };
    const res = await gqlClient.request(query, variables);
    return res.getTranscript;
  }
}

const transcribeGqlClient = new TranscribeGqlClient();

export { TranscribeGqlClient, transcribeGqlClient };
