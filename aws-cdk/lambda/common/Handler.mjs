import { unmarshall } from '@aws-sdk/util-dynamodb';

class Handler {
  constructor () {
    this.handlers = [];
  }

  addHandler (handler) {
    this.handlers.push(handler);
  }

  async handle (record) {
    const keys = unmarshall(record.dynamodb.Keys);
    console.log('keys', keys);
    for (const handler of this.handlers) {
      await handler(record, keys);
    }
  }
}

export { Handler };
