import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

interface Props {
  bucket: aws.s3.Bucket;
  certificate: aws.acm.Certificate;
  aliases: string[];
}

export default class CustomDistribution extends pulumi.ComponentResource {
  public readonly distribution: aws.cloudfront.Distribution;

  constructor (name: string, props: Props) {
    super('custom:Network', name);

    const { bucket, aliases } = props;

    const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(`origin-access-identity-${name}`);
    new aws.s3.BucketPolicy(`bucket-policy-${name}`, {
      bucket: bucket.id,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: originAccessIdentity.iamArn,
            },
            Action: 's3:GetObject',
            Resource: [pulumi.interpolate`${bucket.arn}/*`],
          },
        ],
      },
    });
    this.distribution = new aws.cloudfront.Distribution(`distribution-${name}`, {
      enabled: true,
      origins: [
        {
          originId: bucket.id,
          domainName: bucket.bucketRegionalDomainName,
          s3OriginConfig: {
            originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
          },
        },
      ],
      defaultCacheBehavior: {
        allowedMethods: ['GET', 'HEAD'],
        cachedMethods: ['GET', 'HEAD'],
        targetOriginId: bucket.id,
        viewerProtocolPolicy: 'redirect-to-https',
        forwardedValues: { cookies: { forward: 'none' }, queryString: false },
      },
      restrictions: { geoRestriction: { restrictionType: 'none' } },
      viewerCertificate: { acmCertificateArn: props.certificate.arn, sslSupportMethod: 'sni-only' },
      customErrorResponses: [
        { errorCode: 404, responseCode: 404, responsePagePath: '/index.html' },
        { errorCode: 403, responseCode: 403, responsePagePath: '/index.html' },
      ],
      aliases,
    });
  }
}
