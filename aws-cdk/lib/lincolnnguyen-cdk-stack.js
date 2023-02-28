import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

class LincolnnguyenCdkStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    // const vpc = new ec2.Vpc(this, 'lincolnnguyen-vpc', {
    //   maxAzs: 2,
    //   natGateways: 0,
    //   subnetConfiguration: [
    //     {
    //       name: 'public',
    //       subnetType: ec2.SubnetType.PUBLIC,
    //       cidrMask: 28,
    //     },
    //   ],
    // });

    // const rdsSecurityGroup = new ec2.SecurityGroup(this, 'lincolnnguyen-rds-security-group', {
    //   vpc,
    //   allowAllOutbound: true,
    // });
    //
    // rdsSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3306));

    const lambdaFunction = new lambda.Function(this, 'lincolnnguyen-ddb-stream-lambda', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'lincolnnguyen-ddb-stream-lambda',
      runtime: lambda.Runtime.NODEJS_14_X,
    });

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

    const table = new dynamodb.Table(this, 'lincolnnguyen', {
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

export { LincolnnguyenCdkStack };
