import * as dotenv from 'dotenv';
dotenv.config();

interface environment {
  AWS_REGION: string;
  TERRAFORM_CLOUD_HOSTNAME: string;
  TERRAFORM_CLOUD_ORG: string;
  TERRAFORM_CLOUD_WORKSPACE_NAME: string;
  POSTGRES_PASSWORD: string;
}

const environment: environment = {
  AWS_REGION: process.env.AWS_REGION,
  TERRAFORM_CLOUD_HOSTNAME: process.env.TERRAFORM_CLOUD_HOSTNAME,
  TERRAFORM_CLOUD_ORG: process.env.TERRAFORM_CLOUD_ORG,
  TERRAFORM_CLOUD_WORKSPACE_NAME: process.env.TERRAFORM_CLOUD_WORKSPACE_NAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
};

export { environment };
