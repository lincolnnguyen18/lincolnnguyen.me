import { S3Client } from '@aws-sdk/client-s3';
import { environment } from 'common/environment';

const s3Client = new S3Client({
  region: environment.AWS_REGION,
  credentials: {
    accessKeyId: environment.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
  },
});

export { s3Client };
