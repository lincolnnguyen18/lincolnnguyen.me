import { v4 } from 'uuid';

function enableCallbackIfTrue (condition: boolean, callback: () => void) {
  return condition ? callback : undefined;
}

async function wait (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uuid () {
  return v4();
}

export { enableCallbackIfTrue, wait, uuid };
