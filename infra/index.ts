import * as aws from '@pulumi/aws';
import * as synced from '@pulumi/synced-folder';
import { userDataScript } from './common/scripts';

/* Networking */

const allowAll = [
  {
    fromPort: 0,
    toPort: 0,
    protocol: '-1',
    cidrBlocks: ['0.0.0.0/0'],
  },
];

const defaultSubnet = new aws.ec2.DefaultSubnet('default-subnet', {
  availabilityZone: 'us-east-1a',
});

const allowAllSecurityGroup = new aws.ec2.SecurityGroup('security-group', {
  description: 'Allow inbound traffic from the internet',
  ingress: allowAll,
  egress: allowAll,
});

/* S3 Buckets */

const ecStartupScriptsBucket = new aws.s3.Bucket('bucket', {});
export const ec2StartupScriptsBucketName = ecStartupScriptsBucket.id;

new synced.S3BucketFolder('synced-folder', {
  path: './startup-scripts',
  bucketName: ecStartupScriptsBucket.id,
  acl: aws.s3.PrivateAcl,
  includeHiddenFiles: true,
});

/* IAM */

const ec2InstanceRole = new aws.iam.Role('ec2-instance-role', {
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: 'ec2.amazonaws.com',
        },
        Action: 'sts:AssumeRole',
      },
    ],
  }),
  managedPolicyArns: [
    'arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess',
  ],
});

const ec2InstanceProfile = new aws.iam.InstanceProfile('ec2-instance-profile', {
  role: ec2InstanceRole,
});

/* DynamoDB */

const prodTable = new aws.dynamodb.Table('table', {
  attributes: [
    { name: 'pk', type: 'S' },
    { name: 'sk', type: 'S' },
    { name: 'username', type: 'S' },
    { name: 'transcriptCreatedAt', type: 'S' },
  ],
  hashKey: 'pk',
  rangeKey: 'sk',
  billingMode: 'PAY_PER_REQUEST',
  streamEnabled: true,
  streamViewType: 'NEW_IMAGE',
  localSecondaryIndexes: [
    {
      name: 'usernameIdLookupIndex',
      rangeKey: 'username',
      projectionType: 'INCLUDE',
      nonKeyAttributes: ['id'],
    },
    {
      name: 'listTranscriptsIndex',
      rangeKey: 'transcriptCreatedAt',
      projectionType: 'INCLUDE',
      nonKeyAttributes: ['title', 'transcriptUpdatedAt', 'preview'],
    },
  ],
});
export const prodTableName = prodTable.name;

/* EC2 Instances */

const instance = new aws.ec2.Instance('ec2-instance', {
  // AMI for Ubuntu on t4g.nano in us-east-1
  ami: 'ami-0c6c29c5125214c77',
  instanceType: 't4g.micro',
  keyName: 'default',
  associatePublicIpAddress: true,
  subnetId: defaultSubnet.id,
  vpcSecurityGroupIds: [allowAllSecurityGroup.id],

  userData: userDataScript,
  userDataReplaceOnChange: false,
  iamInstanceProfile: ec2InstanceProfile.name,
});
const elasticIp = new aws.ec2.Eip('elastic-ip', {
  instance: instance.id,
});
export const instancePublicDns = instance.publicDns;
export const instanceId = instance.id;
export const instanceElasticIp = elasticIp.publicIp;

/* Domains */

const subdomains = [
  'api', 'staging.api', 'development.api',
  'database', 'staging.database', 'development.database',
];
for (const subdomain of subdomains) {
  new aws.route53.Record(`${subdomain}-A-record`, {
    zoneId: 'Z10155421ZV6VX4DLYNZ1',
    name: subdomain,
    type: 'A',
    ttl: 300,
    records: [elasticIp.publicIp],
  });
}
