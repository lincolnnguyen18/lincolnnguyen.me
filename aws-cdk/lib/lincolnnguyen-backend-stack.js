import dynamodb from 'aws-cdk-lib/aws-dynamodb';
import lambda from 'aws-cdk-lib/aws-lambda';
import cdk from 'aws-cdk-lib';
import ec2 from 'aws-cdk-lib/aws-ec2';
import rds from 'aws-cdk-lib/aws-rds';
import ecs from 'aws-cdk-lib/aws-ecs';
import ecr from 'aws-cdk-lib/aws-ecr';
import iam from 'aws-cdk-lib/aws-iam';
import s3 from 'aws-cdk-lib/aws-s3';
import cloudfront from 'aws-cdk-lib/aws-cloudfront';
import route53 from 'aws-cdk-lib/aws-route53';
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { environment } from '../common/environment.js';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { LoadBalancerTarget } from 'aws-cdk-lib/aws-route53-targets';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';

class LincolnnguyenBackendStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'lincolnnguyen-vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
      maxAzs: 2,
    });

    const certificate = Certificate.fromCertificateArn(this, 'certificate', environment.BACKEND_CERTIFICATE_ARN);

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'hostedZone', {
      hostedZoneId: environment.HOSTED_ZONE_ID,
      zoneName: environment.HOSTED_ZONE_NAME,
    });

    // db related resources
    const securityGroup = new ec2.SecurityGroup(this, 'lincolnnguyen-security-group', {
      vpc,
      allowAllOutbound: true,
    });
    securityGroup.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.allTraffic());

    const lambdaFunction = new lambda.Function(this, 'lincolnnguyen-ddb-stream-lambda', {
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      functionName: 'lincolnnguyen-ddb-stream-lambda',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(30),
    });

    const lambdaFunctionProd = new lambda.Function(this, 'lincolnnguyen-ddb-stream-lambda-prod', {
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      functionName: 'lincolnnguyen-ddb-stream-lambda-prod',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(30),
    });

    new rds.DatabaseInstance(this, 'lincolnnguyen-rds', {
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      instanceType: new ec2.InstanceType('t3.micro'),
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC,
      }),
      securityGroups: [securityGroup],
      allocatedStorage: 20,
      autoMinorVersionUpgrade: true,
      allowMajorVersionUpgrade: true,
      maxAllocatedStorage: 20,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      credentials: {
        username: environment.RDS_USERNAME,
        password: cdk.SecretValue.unsafePlainText(environment.RDS_PASSWORD),
      },
      publiclyAccessible: true,
      databaseName: environment.RDS_DB_NAME,
      instanceIdentifier: 'lincolnnguyen-rds',
    });

    new rds.DatabaseInstance(this, 'lincolnnguyen-rds-prod', {
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      instanceType: new ec2.InstanceType('t3.micro'),
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC,
      }),
      securityGroups: [securityGroup],
      allocatedStorage: 20,
      autoMinorVersionUpgrade: true,
      allowMajorVersionUpgrade: true,
      maxAllocatedStorage: 20,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      credentials: {
        username: environment.RDS_USERNAME,
        password: cdk.SecretValue.unsafePlainText(environment.RDS_PASSWORD),
      },
      publiclyAccessible: true,
      databaseName: environment.RDS_DB_NAME,
      instanceIdentifier: 'lincolnnguyen-rds-prod',
    });

    const table = new dynamodb.Table(this, 'lincolnnguyen-ddb', {
      tableName: 'lincolnnguyen',
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    table.addLocalSecondaryIndex({
      indexName: 'usernameIdLookupIndex',
      sortKey: { name: 'username', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['id'],
    });

    table.addLocalSecondaryIndex({
      indexName: 'listTranscriptsIndex',
      sortKey: { name: 'transcriptCreatedAt', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['title', 'transcriptUpdatedAt', 'preview'],
    });

    const tableProd = new dynamodb.Table(this, 'lincolnnguyen-ddb-prod', {
      tableName: 'lincolnnguyen-prod',
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    tableProd.addLocalSecondaryIndex({
      indexName: 'usernameIdLookupIndex',
      sortKey: { name: 'username', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['id'],
    });

    tableProd.addLocalSecondaryIndex({
      indexName: 'listTranscriptsIndex',
      sortKey: { name: 'transcriptCreatedAt', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['title', 'transcriptUpdatedAt', 'preview'],
    });

    lambdaFunction.addEventSource(new DynamoEventSource(table, {
      startingPosition: lambda.StartingPosition.LATEST,
    }));

    lambdaFunctionProd.addEventSource(new DynamoEventSource(tableProd, {
      startingPosition: lambda.StartingPosition.LATEST,
    }));

    // api related resources
    const applicationLoadBalancer = new ApplicationLoadBalancer(this, 'lincolnnguyen-api-alb', {
      vpc,
      internetFacing: true,
      loadBalancerName: 'lincolnnguyen-api-alb',
    });

    const cluster = new ecs.Cluster(this, 'lincolnnguyen-api-ecs-cluster', {
      vpc,
      clusterName: 'lincolnnguyen-api-ecs-cluster',
      enableFargateCapacityProviders: true,
    });

    const executionRole = new iam.Role(this, 'lincolnnguyen-api-ecs-execution-role', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      roleName: 'lincolnnguyen-api-ecs-execution-role',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AmazonECSTaskExecutionRolePolicy',
        ),
      ],
    });

    const fargateService = new ApplicationLoadBalancedFargateService(this, 'lincolnnguyen-fargate-api', {
      taskImageOptions: {
        // image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
        image: ecs.ContainerImage.fromRegistry(environment.BACKEND_IMAGE_NAME),
        executionRole,
      },
      serviceName: 'lincolnnguyen-fargate-api',
      capacityProviderStrategies: [
        {
          capacityProvider: 'FARGATE_SPOT',
          weight: 1,
        },
      ],
      cluster,
      assignPublicIp: true,
      loadBalancer: applicationLoadBalancer,
      taskSubnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC,
      }),
    });

    fargateService.targetGroup.configureHealthCheck({
      healthyHttpCodes: '200-499',
    });

    applicationLoadBalancer.addListener('lincolnnguyen-api-alb-listener', {
      port: 443,
      certificates: [certificate],
      defaultTargetGroups: [fargateService.targetGroup],
    });

    new route53.ARecord(this, 'lincolnnguyen-api-alb-record', {
      zone: hostedZone,
      recordName: environment.BACKEND_DOMAIN_NAME,
      target: route53.RecordTarget.fromAlias(new LoadBalancerTarget(applicationLoadBalancer)),
    });

    new ecr.Repository(this, 'lincolnnguyen-api-ecr', {
      repositoryName: environment.ECR_REPOSITORY_NAME,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // s3 related resources
    const bucket = new s3.Bucket(this, 'lincolnnguyen-api-bucket', {
      bucketName: environment.BACKEND_BUCKET_NAME,
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedMethods: [s3.HttpMethods.PUT],
          allowedOrigins: ['http://localhost:3000', 'https://lincolnnguyen.me'],
        },
      ],
    });

    const oai = new cloudfront.OriginAccessIdentity(this, 'lincolnnguyen-api-oai');
    bucket.grantRead(oai.grantPrincipal);

    const pubKey = new cloudfront.PublicKey(this, 'lincolnnguyen-api-cloudfront-public-key', {
      encodedKey: environment.BACKEND_CLOUDFRONT_PUBLIC_KEY,
      publicKeyName: 'lincolnnguyen-api-cloudfront-public-key',
    });

    const keyGroup = new cloudfront.KeyGroup(this, 'lincolnnguyen-api-cloudfront-key-group', {
      items: [pubKey],
      keyGroupName: 'lincolnnguyen-api-cloudfront-key-group',
    });

    new cloudfront.Distribution(this, 'lincolnnguyen-api-distribution', {
      comment: 'lincolnnguyen-api-distribution',
      defaultBehavior: {
        origin: new S3Origin(bucket, { oai }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        trustedKeyGroups: [keyGroup],
      },
    });

    bucket.grantReadWrite(lambdaFunction);
    bucket.grantReadWrite(lambdaFunctionProd);
  }
}

export { LincolnnguyenBackendStack };
