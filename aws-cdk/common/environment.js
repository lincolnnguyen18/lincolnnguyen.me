import dotenv from 'dotenv';
dotenv.config();

const environment = {
  RDS_USERNAME: process.env.RDS_USERNAME,
  RDS_PASSWORD: process.env.RDS_PASSWORD,
  RDS_DB_NAME: process.env.RDS_DB_NAME,

  FRONTEND_BUCKET_NAME: process.env.FRONTEND_BUCKET_NAME,
  FRONTEND_DOMAIN_NAME: process.env.FRONTEND_DOMAIN_NAME,
  FRONTEND_HOSTED_ZONE_ID: process.env.FRONTEND_HOSTED_ZONE_ID,
  FRONTEND_HOSTED_ZONE_NAME: process.env.FRONTEND_HOSTED_ZONE_NAME,
  FRONTEND_CERTIFICATE_ARN: process.env.FRONTEND_CERTIFICATE_ARN,
  FRONTEND_BUILD_PATH: process.env.FRONTEND_BUILD_PATH,
};

export { environment };
