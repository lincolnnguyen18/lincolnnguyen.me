import dynamodb from 'aws-cdk-lib/aws-dynamodb';
import lambda from 'aws-cdk-lib/aws-lambda';
import cdk from 'aws-cdk-lib';
import ec2 from 'aws-cdk-lib/aws-ec2';
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

class LincolnnguyenBackendStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'lincolnnguyen-vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
      maxAzs: 2,
    });

    const sg = new ec2.SecurityGroup(this, 'lincolnnguyen-sg', {
      vpc,
      allowAllOutbound: true,
    });
    sg.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.allTraffic());

    const lambdaFunction = new lambda.Function(this, 'lincolnnguyen-ddb-stream-lambda', {
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      functionName: 'lincolnnguyen-ddb-stream-lambda',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(30),
    });

    // const rds = new ServerlessCluster(this, 'lincolnnguyen-rds', {
    //   engine: DatabaseClusterEngine.AURORA_POSTGRESQL,
    //   vpc,
    //   credentials: {
    //     username: environment.RDS_USERNAME,
    //     password: environment.RDS_PASSWORD,
    //   },
    //   defaultDatabaseName: environment.RDS_DB_NAME,
    //   clusterIdentifier: 'lincolnnguyen-rds',
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });

    // const rdsSubnetGroup = new rds.SubnetGroup(this, 'lincolnnguyen-rds', {
    //   vpc,
    //   description: 'Subnet group for lincolnnguyen RDS',
    //   subnetGroupName: 'lincolnnguyen-rds',
    //   vpcSubnets: {
    //     subnetType: ec2.SubnetType.PUBLIC,
    //   },
    // });
    //
    // const rdsDatabase = new rds.DatabaseInstance(this, 'MyDatabase', {
    //   engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_5_7 }),
    //   instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
    //   masterUsername: 'admin',
    //   masterUserPassword: 'password',
    //   vpc,
    //   subnetGroup: rdsSubnetGroup,
    //   publiclyAccessible: true,
    //   securityGroups: [rdsSecurityGroup],
    //   deletionProtection: false,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });
    //
    // rdsDatabase.connections.allowDefaultPortFromAnyIpv4('Open to the world');

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
