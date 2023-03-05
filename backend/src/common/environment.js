import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const environment = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  PORT: process.env.PORT,
  DDB_MAIN_TABLE: process.env.DDB_MAIN_TABLE,
  JWT_SECRET: process.env.JWT_SECRET,
  VERSION: process.env.VERSION,
};

export { environment };
