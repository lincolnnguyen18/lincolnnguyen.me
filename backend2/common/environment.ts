import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

interface environment {
  PORT: number;
}

const environment: environment = {
  PORT: parseInt(process.env.PORT as string, 10),
};

export { environment };
