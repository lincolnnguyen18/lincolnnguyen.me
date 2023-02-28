import dotenv from 'dotenv';
dotenv.config();

const environment = {
  RDS_USERNAME: process.env.RDS_USERNAME,
  RDS_PASSWORD: process.env.RDS_PASSWORD,
  RDS_DB_NAME: process.env.RDS_DB_NAME,
};

export { environment };
