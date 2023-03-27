import * as dotenv from 'dotenv';
dotenv.config();

interface environment {
  POSTGRES_PASSWORD: string;
}

const environment: environment = {
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
};

export { environment };
