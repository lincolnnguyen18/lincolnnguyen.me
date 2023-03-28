import * as dotenv from 'dotenv';
dotenv.config();

interface environment {
  POSTGRES_PASSWORD: string;
  GIT_URL: string;
  DOCKER_COMPOSE_DIR_PATH: string;
}

const environment: environment = {
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
  GIT_URL: process.env.GIT_URL as string,
  DOCKER_COMPOSE_DIR_PATH: process.env.DOCKER_COMPOSE_DIR_PATH as string,
};

export { environment };
