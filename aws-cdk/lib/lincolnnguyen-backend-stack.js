import dynamodb from 'aws-cdk-lib/aws-dynamodb';
import lambda from 'aws-cdk-lib/aws-lambda';
import cdk from 'aws-cdk-lib';
import ec2 from 'aws-cdk-lib/aws-ec2';
import rds from 'aws-cdk-lib/aws-rds';
import ecs from 'aws-cdk-lib/aws-ecs';
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { environment } from '../common/environment.js';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { LoadBalancerTarget } from 'aws-cdk-lib/aws-route53-targets';

class LincolnnguyenBackendStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'lincolnnguyen-vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
      maxAzs: 2,
    });

    const certificate = Certificate.fromCertificateArn(this, 'certificate', environment.BACKEND_CERTIFICATE_ARN);

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'hostedZone', {
      hostedZoneId: environment.HOSTED_ZONE_ID,
      zoneName: environment.HOSTED_ZONE_NAME,
    });

    // db related resources
    const rdsSubnetGroup = new rds.SubnetGroup(this, 'lincolnnguyen-rds-subnet-group', {
      description: 'Subnet group for lincolnnguyen RDS',
      vpc,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      subnetGroupName: 'lincolnnguyen-rds-subnet-group',
      vpcSubnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC,
      }),
    });

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

    const rdsCluster = new rds.DatabaseCluster(this, 'lincolnnguyen-rds', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_14_6,
      }),
      instances: 1,
      instanceProps: {
        vpc,
        instanceType: new ec2.InstanceType('serverless'),
        autoMinorVersionUpgrade: true,
        publiclyAccessible: true,
        securityGroups: [securityGroup],
        vpcSubnets: vpc.selectSubnets({
          subnetType: ec2.SubnetType.PUBLIC,
        }),
      },
      credentials: {
        username: environment.RDS_USERNAME,
        password: cdk.SecretValue.unsafePlainText(environment.RDS_PASSWORD),
      },
      clusterIdentifier: 'lincolnnguyen-rds',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      subnetGroup: rdsSubnetGroup,
      defaultDatabaseName: environment.RDS_DB_NAME,
    });

    cdk.Aspects.of(rdsCluster).add({
      visit: (node) => {
        if (node instanceof rds.CfnDBCluster) {
          node.serverlessV2ScalingConfiguration = {
            minCapacity: 0.5,
            maxCapacity: 1,
          };
        }
      },
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

    lambdaFunction.addEventSource(new DynamoEventSource(table, {
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

    const fargateService = new ApplicationLoadBalancedFargateService(this, 'lincolnnguyen-fargate-api', {
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
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

    applicationLoadBalancer.addListener('lincolnnguyen-api-alb-listener', {
      port: 443,
      certificates: [certificate],
      defaultTargetGroups: [fargateService.targetGroup],
    });

    new ARecord(this, 'lincolnnguyen-api-alb-record', {
      zone: hostedZone,
      recordName: environment.BACKEND_DOMAIN_NAME,
      target: RecordTarget.fromAlias(new LoadBalancerTarget(applicationLoadBalancer)),
    });
  }
}

export { LincolnnguyenBackendStack };
