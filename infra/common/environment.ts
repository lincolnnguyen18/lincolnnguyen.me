import * as dotenv from 'dotenv';
dotenv.config();

interface environment {
  POSTGRES_PASSWORD: string;
  STARTUP_SCRIPTS_BUCKET_NAME: string;
}

const environment: environment = {
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
  STARTUP_SCRIPTS_BUCKET_NAME: process.env.STARTUP_SCRIPTS_BUCKET_NAME as string,
};

export { environment };
