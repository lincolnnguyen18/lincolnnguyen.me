import cloudfront from 'aws-cdk-lib/aws-cloudfront';
import s3 from 'aws-cdk-lib/aws-s3';
import route53 from 'aws-cdk-lib/aws-route53';
import cdk from 'aws-cdk-lib';
import { environment } from '../common/environment.js';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

class LincolnnguyenFrontendStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'bucket', {
      bucketName: environment.FRONTEND_BUCKET_NAME,
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET],
        allowedOrigins: ['lincolnnguyen.me'],
        allowedHeaders: ['*'],
      }],
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'originAccessIdentity');
    bucket.grantRead(originAccessIdentity.grantPrincipal);

    const certificate = Certificate.fromCertificateArn(this, 'certificate', environment.FRONTEND_CERTIFICATE_ARN);

    const distribution = new cloudfront.Distribution(this, 'distribution', {
      comment: 'lincolnnguyen-frontend-distribution',
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
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'hostedZone', {
      hostedZoneId: environment.HOSTED_ZONE_ID,
      zoneName: environment.HOSTED_ZONE_NAME,
    });

    new route53.ARecord(this, 'record', {
      recordName: environment.FRONTEND_DOMAIN_NAME,
      target: route53.RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
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
