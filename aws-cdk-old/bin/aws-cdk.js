#!/usr/bin/env node

import cdk from 'aws-cdk-lib';
import { ReactAppStack } from '../lib/react-app-stack.js';

const app = new cdk.App();
const env = { account: '542773719222', region: 'us-east-1' };

new ReactAppStack(app, 'lincolnnguyen-react-app', {
  env,
  bucketName: 'lincolnnguyen-react-app',
  url: 'lincolnnguyen.me',
  hostedZoneId: 'Z10155421ZV6VX4DLYNZ1',
  certificateArn: 'arn:aws:acm:us-east-1:542773719222:certificate/b92a3994-b7d4-47ca-b159-800ab1bab200',
  buildPath: '/Users/lincolnnguyen/repos/lincolnnguyen.me/frontend/build',
});
