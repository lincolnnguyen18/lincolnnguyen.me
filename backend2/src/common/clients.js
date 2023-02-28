import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { environment } from './environment.js';
import { PrismaClient } from '@prisma/client';

const ddb = new DynamoDBClient({
  region: environment.AWS_REGION,
  credentials: {
    accessKeyId: environment.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
  },
});

const prismaClient = new PrismaClient();

const ddbClient = DynamoDBDocumentClient.from(ddb);

export { ddbClient, prismaClient };
