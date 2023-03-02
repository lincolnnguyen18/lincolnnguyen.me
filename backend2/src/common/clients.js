import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { environment } from './environment.js';
import { PrismaClient } from '@prisma/client';
import { GraphQLClient } from 'graphql-request';

const ddb = new DynamoDBClient({
  region: environment.AWS_REGION,
  credentials: {
    accessKeyId: environment.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
  },
});

const prismaClient = new PrismaClient();

const ddbClient = DynamoDBDocumentClient.from(ddb);

const gqlClient = new GraphQLClient(environment.GRAPHQL_URL);
gqlClient.setHeader('Authorization', environment.GRAPHQL_AUTHORIZATION);
const gqlClientNoAuth = new GraphQLClient(environment.GRAPHQL_URL);

export { ddbClient, prismaClient, gqlClient, gqlClientNoAuth };
