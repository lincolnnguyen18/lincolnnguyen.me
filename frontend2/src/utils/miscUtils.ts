import { v4 } from 'uuid';

function enablePropOnCondition (condition: boolean, prop: any) {
  return condition ? prop : undefined;
}

async function wait (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uuid () {
  return v4();
}

export { enablePropOnCondition, wait, uuid };
