import { GraphQLClient } from 'graphql-request';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const graphQLClient = new GraphQLClient(process.env.REACT_APP_GRAPHQL_URL);
const twConfig = resolveConfig(tailwindConfig);
const screenSizes = twConfig.theme.screens;
const colors = twConfig.theme.colors;

export { graphQLClient, twConfig, screenSizes, colors };
