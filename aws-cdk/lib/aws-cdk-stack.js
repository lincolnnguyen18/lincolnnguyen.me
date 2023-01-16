import cdk from 'aws-cdk-lib';
import dynamodb from 'aws-cdk-lib/aws-dynamodb';

class AwsCdkStack extends cdk.Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    // create dynamodb table
    const table = new dynamodb.Table(this, 'lincolnnguyen.me-dev', {
      tableName: 'lincolnnguyen.me-dev',
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    table.addLocalSecondaryIndex({
      indexName: 'contactsUpdatedAtIndex',
      sortKey: { name: 'updatedAt', type: dynamodb.AttributeType.NUMBER },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['createdAt', 'contactId'],
    });

    table.addGlobalSecondaryIndex({
      indexName: 'usersIndex',
      partitionKey: { name: 'pk2', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['id'],
    });

    table.addGlobalSecondaryIndex({
      indexName: 'emailsIndex',
      partitionKey: { name: 'pk3', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'email', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['id'],
    });
  }
}

export { AwsCdkStack };
