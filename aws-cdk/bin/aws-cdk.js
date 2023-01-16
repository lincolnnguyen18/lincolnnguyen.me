#!/usr/bin/env node

import cdk from 'aws-cdk-lib';
// import { AwsCdkStack } from '../lib/aws-cdk-stack.js';
import { ReactAppStack } from '../lib/react-app-stack.js';

const app = new cdk.App();
const env = { account: '542773719222', region: 'us-east-1' };

// new AwsCdkStack(app, 'lincolnnguyen-backend', { env });

new ReactAppStack(app, 'lincolnnguyen-react-app', {
  env,
  bucketName: 'lincolnnguyen-react-app',
  bucketWebsiteUrl: 'https://lincolnnguyen.me',
});
