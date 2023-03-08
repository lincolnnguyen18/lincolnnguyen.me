import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const environment = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  PORT: process.env.PORT,
  DDB_MAIN_TABLE: process.env.DDB_MAIN_TABLE,
  JWT_SECRET: process.env.JWT_SECRET,
  VERSION: 'Version 5',
  CLOUDFRONT_KEY_PAIR_ID: process.env.CLOUDFRONT_KEY_PAIR_ID,
  CLOUDFRONT_PRIVATE_KEY: process.env.CLOUDFRONT_PRIVATE_KEY,
  CLOUDFRONT_DISTRIBUTION_DOMAIN: process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN,
  API_S3_BUCKET_NAME: process.env.API_S3_BUCKET_NAME,
};

export { environment };
