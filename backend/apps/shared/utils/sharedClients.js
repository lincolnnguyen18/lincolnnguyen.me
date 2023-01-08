import fs from 'fs';
import { JWT } from 'google-auth-library';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';
dotenv.config();

const secret = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const secretObject = JSON.parse(secret);
const clientEmail = secretObject.client_email;
const privateKey = secretObject.private_key;

const googleAuthClient = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

const ddb = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const dynamoDBClient = DynamoDBDocumentClient.from(ddb);

export { googleAuthClient, dynamoDBClient };
