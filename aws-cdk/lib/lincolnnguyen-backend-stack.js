import dynamodb from 'aws-cdk-lib/aws-dynamodb';
import lambda from 'aws-cdk-lib/aws-lambda';
import cdk from 'aws-cdk-lib';
import ec2 from 'aws-cdk-lib/aws-ec2';
import rds from 'aws-cdk-lib/aws-rds';
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { environment } from '../common/environment.js';

class LincolnnguyenBackendStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'lincolnnguyen-vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
      maxAzs: 2,
    });

    const rdsSubnetGroup = new rds.SubnetGroup(this, 'lincolnnguyen-rds-subnet-group', {
      description: 'Subnet group for lincolnnguyen RDS',
      vpc,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      subnetGroupName: 'lincolnnguyen-rds-subnet-group',
      vpcSubnets: {
        subnets: vpc.publicSubnets,
      },
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
  }
}

export { LincolnnguyenBackendStack };
