import * as aws from '@pulumi/aws';
import { userDataScript } from './common/scripts';

/* Networking */

const instanceIp = '65.109.172.137';

/* Certificates */
const certificate = new aws.acm.Certificate('certificate', {
  domainName: 'lincolnnguyen.me',
  subjectAlternativeNames: ['*.lincolnnguyen.me', '*.api.lincolnnguyen.me'],
  validationMethod: 'DNS',
});

/* S3 Buckets */

const startupScriptsBucket = new aws.s3.Bucket('bucket', {});
export const startupScriptsBucketName = startupScriptsBucket.id;

const letsencryptS3Bucket = new aws.s3.Bucket('bucket-2', {});
export const letsencryptS3BucketName = letsencryptS3Bucket.id;

// const prodStaticAssetsBucket = new aws.s3.Bucket('bucket-2', {});
// const prodStaticAssetsDistribution = new aws.cloudfront.Distribution('distribution', {
//   enabled: true,
//   origins: [
//     {
//       originId: prodStaticAssetsBucket.arn,
//       domainName: prodStaticAssetsBucket.bucketRegionalDomainName,
//     },
//   ],
//   defaultCacheBehavior: {
//     allowedMethods: [
//         "GET",
//         "HEAD",
//     ],
//     cachedMethods: [
//         "GET",
//         "HEAD",
//     ],
//     targetOriginId: prodStaticAssetsBucket.id,
//     viewerProtocolPolicy: "redirect-to-https",
//   },
//   restrictions: {
//     geoRestriction: {
//       restrictionType: "none",
//     },
//   },
//   viewerCertificate: {

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
    records: [instanceIp],
  });
}

/* Other exports */
export const userData = userDataScript;
