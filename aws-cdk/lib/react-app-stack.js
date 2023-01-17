import cdk from 'aws-cdk-lib';
import s3 from 'aws-cdk-lib/aws-s3';
import cloudfront from 'aws-cdk-lib/aws-cloudfront';

class ReactAppStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);
    const { bucketName, bucketWebsiteUrl } = props;

    const bucket = new s3.Bucket(this, 'bucket', {
      bucketName,
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
    });

    const oai = new cloudfront.OriginAccessIdentity(this, 'oai');
    oai.grantRead(bucket.grantPrincipal);
  }
}

export { ReactAppStack };