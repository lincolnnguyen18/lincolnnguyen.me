import { gql } from 'graphql-request';
import { gqlClient, gqlClientNoAuth } from '../common/clients.js';

class UserGqlClient {
  async getTokenFromUsernamePassword ({ username, password }) {
    const query = gql`
      query ($username: String!, $password: String!) {
        login(username: $username, password: $password)
      }
    `;
    const variables = {
      username,
      password,
    };
    const res = await gqlClientNoAuth.request(query, variables);
    return res.login;
  }

  async getUserFromToken () {
    const query = gql`
      query {
        user {
          id
          username
          playbackSpeed
          transcribeLang
          translateLang
          createdAt
          updatedAt
        }
      }
    `;
    const res = await gqlClient.request(query);
    return res.user;
  }

  async registerUser ({ username, password, confirmPassword }) {
    const query = gql`
      mutation ($username: String!, $password: String!, $confirmPassword: String!) {
        register(username: $username, password: $password, confirmPassword: $confirmPassword) {
          field
          message
        }
      }
    `;
    const variables = {
      username,
      password,
      confirmPassword,
    };
    const res = await gqlClientNoAuth.request(query, variables);
    return res.register;
  }
}

const userGqlClient = new UserGqlClient();

export { UserGqlClient, userGqlClient };
