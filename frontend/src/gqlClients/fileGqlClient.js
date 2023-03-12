import { gql } from 'graphql-request';
import { gqlClient } from '../common/clients';

class FileGqlClient {
  async uploadFile ({ s3ObjectKey }) {
    const query = gql`
      query ($s3ObjectKey: String!) {
        uploadFile(s3ObjectKey: $s3ObjectKey)
      }
    `;
    const variables = {
      s3ObjectKey,
    };
    const res = await gqlClient.request(query, variables);
    return res.uploadFile;
  }

  async getFile ({ s3ObjectKey }) {
    const query = gql`
      query ($s3ObjectKey: String!) {
        getFile(s3ObjectKey: $s3ObjectKey)
      }
    `;
    const variables = {
      s3ObjectKey,
    };
    const res = await gqlClient.request(query, variables);
    return res.getFile;
  }
}

const fileGqlClient = new FileGqlClient();

export { FileGqlClient, fileGqlClient };
