import { gql } from 'graphql-request';
import { gqlClient } from '../common/clients.js';

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
    const res = await gqlClient.request(query, variables);
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
          transcribeCutOffType
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
        register(username: $username, password: $password, confirmPassword: $confirmPassword)
      }
    `;
    const variables = {
      username,
      password,
      confirmPassword,
    };
    const res = await gqlClient.request(query, variables);
    return res.register;
  }

  async updateUser ({ username, password, playbackSpeed, transcribeLang, translateLang, transcribeCutOffType }) {
    const query = gql`
        mutation ($username: String, $password: String, $playbackSpeed: Float, $transcribeLang: String, $translateLang: String, $transcribeCutOffType: String) {
            updateUser(input: { username: $username, password: $password, playbackSpeed: $playbackSpeed, transcribeLang: $transcribeLang, translateLang: $translateLang, transcribeCutOffType: $transcribeCutOffType })
        }
    `;
    const variables = {
      username,
      password,
      playbackSpeed,
      transcribeLang,
      translateLang,
      transcribeCutOffType,
    };
    const res = await gqlClient.request(query, variables);
    return res.updateUser;
  }
}

const userGqlClient = new UserGqlClient();

export { UserGqlClient, userGqlClient };
