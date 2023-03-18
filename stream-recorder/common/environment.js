import dotenv from 'dotenv';
dotenv.config({ override: true });
// console.log(process.env);

const environment = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  API_S3_BUCKET_NAME: process.env.API_S3_BUCKET_NAME,
};

export { environment };
