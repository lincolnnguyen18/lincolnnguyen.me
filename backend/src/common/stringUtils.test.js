import { buildUpdateExpression } from './stringUtils.js';

describe('stringUtils', () => {
  it('buildUpdateExpression', () => {
    const attributes = {
      name: 'John',
      age: 25,
      city: null,
      country: 'USA',
      email: undefined,
    };

    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } = buildUpdateExpression(attributes);

    console.log(UpdateExpression);
    console.log(ExpressionAttributeNames);
    console.log(ExpressionAttributeValues);
  });

  it('buildUpdateExpression empty', () => {
    const attributes = {
      city: null,
      country: null,
      email: undefined,
    };

    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } = buildUpdateExpression(attributes);

    console.log(UpdateExpression);
    console.log(UpdateExpression === '');
    console.log(ExpressionAttributeNames);
    console.log(ExpressionAttributeValues);
  });
});
