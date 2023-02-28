import { userSqlDao } from '../daos/userSqlDao.js';

class DdbStreamRecordHandler {
  constructor () {
    this.handlers = [];
  }

  addHandler (handler) {
    this.handlers.push(handler);
  }

  async handle (event) {
    for (const handler of this.handlers) {
      await handler(event);
    }
  }
}

async function putUserHandler ({ eventName, record }) {
  function canHandle () {
    return eventName === 'INSERT' && record.pk === 'userData';
  }
  if (!canHandle()) return;

  const id = record.sk;
  return userSqlDao.putUser({
    id,
    ...record,
  });
}

const ddbStreamRecordHandler = new DdbStreamRecordHandler();
ddbStreamRecordHandler.addHandler(putUserHandler);

export { ddbStreamRecordHandler };
export { putUserHandler };
