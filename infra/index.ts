import * as aws from '@pulumi/aws';
import CustomDistribution from './components/CustomDistribution';

const zoneId = 'Z10155421ZV6VX4DLYNZ1';

/* Certificates */
const certificate = new aws.acm.Certificate('certificate', {
  domainName: 'lincolnnguyen.me',
  subjectAlternativeNames: ['*.lincolnnguyen.me', '*.api.lincolnnguyen.me'],
  validationMethod: 'DNS',
}); 

/* S3 Buckets */
const startupScriptsBucket = new aws.s3.Bucket('bucket');
export const startupScriptsBucketName = startupScriptsBucket.id;

const letsencryptS3Bucket = new aws.s3.Bucket('bucket-2');
export const letsencryptS3BucketName = letsencryptS3Bucket.id;

const prodStaticAssetsBucket = new aws.s3.Bucket('bucket-3');
export const prodStaticAssetsBucketName = prodStaticAssetsBucket.id;
const stagingStaticAssetsBucket = new aws.s3.Bucket('bucket-4');
export const stagingStaticAssetsBucketName = stagingStaticAssetsBucket.id;
const devStaticAssetsBucket = new aws.s3.Bucket('bucket-5');
export const devStaticAssetsBucketName = devStaticAssetsBucket.id;

const prodAssetsBucket = new aws.s3.Bucket('bucket-6');
export const prodAssetsBucketName = prodAssetsBucket.id;

/* Distributions */
const prodStaticAssetsDistribution = new CustomDistribution('distribution', {
  bucket: prodStaticAssetsBucket,
  certificate,
  aliases: ['lincolnnguyen.me', 'staging.lincolnnguyen.me', 'development.lincolnnguyen.me'],
});
export const prodStaticAssetsDistributionDomainName = prodStaticAssetsDistribution.distribution.domainName;
export const prodStaticAssetsDistributionId = prodStaticAssetsDistribution.distribution.id;

// const prodAssetsDistribution = new CustomDistribution('distribution-2', {
//   bucket: prodAssetsBucket,
//   certificate,
//   aliases: ['assets.lincolnnguyen.me'],
// });

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


/* Domains */
const backendSubdomains = [
  'api', 'staging.api', 'development.api',
  'database', 'staging.database', 'development.database',
];
backendSubdomains.forEach((subdomain, index) => {
  let name = `A-record-${index + 1}`;
  if (index === 0) {
    name = 'A-record';
  }
  new aws.route53.Record(name, {
    zoneId,
    name: subdomain,
    type: 'A',
    ttl: 300,
    records: ['65.109.172.137'],
  });
});

// const frontendSubdomains = [
//   '', 'staging', 'development',
// ];
new aws.route53.Record('A-record-7', {
  zoneId,
  name: 'lincolnnguyen.me',
  type: 'A',
  aliases: [{
    name: prodStaticAssetsDistributionDomainName,
    zoneId: prodStaticAssetsDistribution.distribution.hostedZoneId,
    evaluateTargetHealth: true,
  }],
});
