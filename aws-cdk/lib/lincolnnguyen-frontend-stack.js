import { environment } from '../common/environment.js';
import { Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import cdk from 'aws-cdk-lib';

class LincolnnguyenFrontendStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'bucket', {
      bucketName: environment.FRONTEND_BUCKET_NAME,
      publicReadAccess: false,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'originAccessIdentity');
    bucket.grantRead(originAccessIdentity.grantPrincipal);

    const certificate = Certificate.fromCertificateArn(this, 'certificate', environment.FRONTEND_CERTIFICATE_ARN);

    const distribution = new Distribution(this, 'distribution', {
      defaultRootObject: 'index.html',
      domainNames: [environment.FRONTEND_DOMAIN_NAME],
      certificate,
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          responseHttpStatus: 200,
        },
        {
          httpStatus: 403,
          responsePagePath: '/index.html',
          responseHttpStatus: 200,
        },
      ],
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'hostedZone', {
      hostedZoneId: environment.HOSTED_ZONE_ID,
      zoneName: environment.HOSTED_ZONE_NAME,
    });

    new ARecord(this, 'record', {
      recordName: environment.FRONTEND_DOMAIN_NAME,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: hostedZone,
    });

    new BucketDeployment(this, 'bucketDeployment', {
      sources: [Source.asset(environment.FRONTEND_BUILD_PATH)],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}

export { LincolnnguyenFrontendStack };
