import { gql } from 'graphql-request';
import { gqlClient, gqlClientNoAuth } from '../common/clients.js';

class UserGqlClient {
  async getToken ({ username, password }) {
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

  async getUser () {
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

  async updateUser ({ username, password, playbackSpeed, transcribeLang, translateLang }) {
    const query = gql`
        mutation ($username: String, $password: String, $playbackSpeed: Float, $transcribeLang: String, $translateLang: String) {
            updateUser(input: { username: $username, password: $password, playbackSpeed: $playbackSpeed, transcribeLang: $transcribeLang, translateLang: $translateLang }) {
                field
                message
            }
        }
    `;
    const variables = {
      username,
      password,
      playbackSpeed,
      transcribeLang,
      translateLang,
    };
    const res = await gqlClient.request(query, variables);
    return res.updateUser;
  }
}

const userGqlClient = new UserGqlClient();

export { UserGqlClient, userGqlClient };
