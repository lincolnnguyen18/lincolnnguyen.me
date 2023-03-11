import { PrismaClient } from '@prisma/client';
import { S3Client } from '@aws-sdk/client-s3';
import { environment } from './environment.mjs';

const prismaClient = new PrismaClient();

const s3Client = new S3Client({
  region: environment.AWS_REGION,
});

export { prismaClient, s3Client };
