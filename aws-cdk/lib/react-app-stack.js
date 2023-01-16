import cdk from 'aws-cdk-lib';
import s3 from 'aws-cdk-lib/aws-s3';

class ReactAppStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);
    const { bucketName, bucketWebsiteUrl } = props;

    const bucket = new s3.Bucket(this, bucketName, {
      bucketName,
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
    });

    // const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI', {
    // staticAssetsBucket.grantRead(originAccessIdentity.grantPrincipal);
  }
}

export { ReactAppStack };