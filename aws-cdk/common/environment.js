import dotenv from 'dotenv';
dotenv.config();

const environment = {
  RDS_USERNAME: process.env.RDS_USERNAME,
  RDS_PASSWORD: process.env.RDS_PASSWORD,
  RDS_DB_NAME: process.env.RDS_DB_NAME,

  FRONTEND_BUCKET_NAME: process.env.FRONTEND_BUCKET_NAME,
  FRONTEND_DOMAIN_NAME: process.env.FRONTEND_DOMAIN_NAME,
  HOSTED_ZONE_ID: process.env.HOSTED_ZONE_ID,
  HOSTED_ZONE_NAME: process.env.HOSTED_ZONE_NAME,
  FRONTEND_CERTIFICATE_ARN: process.env.FRONTEND_CERTIFICATE_ARN,
  FRONTEND_BUILD_PATH: process.env.FRONTEND_BUILD_PATH,

  BACKEND_DOMAIN_NAME: process.env.BACKEND_DOMAIN_NAME,
  BACKEND_CERTIFICATE_ARN: process.env.BACKEND_CERTIFICATE_ARN,
  ECR_REPOSITORY_NAME: process.env.ECR_REPOSITORY_NAME,
  BACKEND_IMAGE_NAME: process.env.BACKEND_IMAGE_NAME,
  BACKEND_BUCKET_NAME: process.env.BACKEND_BUCKET_NAME,
  BACKEND_CLOUDFRONT_PUBLIC_KEY: process.env.BACKEND_CLOUDFRONT_PUBLIC_KEY,
};

export { environment };
