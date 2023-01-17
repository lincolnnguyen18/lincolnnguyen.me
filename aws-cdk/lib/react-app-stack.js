import cdk, { CfnOutput } from 'aws-cdk-lib';
import { Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

class ReactAppStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);
    const { bucketName, url, certificateArn, buildPath, hostedZoneId } = props;

    const bucket = new Bucket(this, 'bucket', {
      bucketName,
      publicReadAccess: false,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'originAccessIdentity');
    bucket.grantRead(originAccessIdentity.grantPrincipal);

    const certificate = Certificate.fromCertificateArn(this, 'certificate', certificateArn);

    const distribution = new Distribution(this, 'distribution', {
      defaultRootObject: 'index.html',
      domainNames: [url],
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
      hostedZoneId,
      zoneName: url,
    });

    new ARecord(this, 'record', {
      recordName: url,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: hostedZone,
    });

    new BucketDeployment(this, 'bucketDeployment', {
      sources: [Source.asset(buildPath)],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'output', {
      value: distribution.distributionDomainName,
    });
  }
}

export { ReactAppStack };
