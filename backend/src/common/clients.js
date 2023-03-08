import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import { environment } from './environment.js';
import { PrismaClient } from '@prisma/client';

const ddb = new DynamoDBClient({
  region: environment.AWS_REGION,
  credentials: {
    accessKeyId: environment.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3Client({
  region: environment.AWS_REGION,
  credentials: {
    accessKeyId: environment.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
  },
});

const prismaClient = new PrismaClient();

const ddbClient = DynamoDBDocumentClient.from(ddb);

export { ddbClient, prismaClient, s3Client };
