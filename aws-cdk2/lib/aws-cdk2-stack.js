const { Stack } = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');

class AwsCdk2Stack extends Stack {
  constructor (scope, id, props) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'lincolnnguyen.me', {
      tableName: 'lincolnnguyen.me',
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    table.addLocalSecondaryIndex({
      indexName: 'usernameIdLookupIndex',
      sortKey: { name: 'username', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['id'],
    });
  }
}

module.exports = { AwsCdk2Stack };
