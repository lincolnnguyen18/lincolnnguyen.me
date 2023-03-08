import { userSqlDao } from '../daos/userSqlDao.mjs';
import { logger } from './utils.mjs';
import { unmarshall } from '@aws-sdk/util-dynamodb';

class DdbStreamRecordHandler {
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

async function putUserHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'INSERT' && keys.pk === 'userData';
  }
  if (!canHandle()) return;

  const id = keys.sk;
  logger.log('id', id);
  const newImage = unmarshall(record.dynamodb.NewImage);
  console.log('newImage', newImage);
  const res = await userSqlDao.putUser({
    id,
    ...newImage,
    createdAt: newImage.transcriptCreatedAt,
    updatedAt: newImage.transcriptUpdatedAt,
  });
  logger.log('res', res);
  return res;
}

async function updateUserHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'MODIFY' && keys.pk === 'userData';
  }
  if (!canHandle()) return;

  const id = keys.sk;
  logger.log('id', id);
  const newImage = unmarshall(record.dynamodb.NewImage);
  console.log('newImage', newImage);
  const res = await userSqlDao.updateUser({
    id,
    ...newImage,
    createdAt: newImage.transcriptCreatedAt,
    updatedAt: newImage.transcriptUpdatedAt,
  });
  logger.log('res', res);
  return res;
}

async function deleteUserHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'REMOVE' && keys.pk === 'userData';
  }
  if (!canHandle()) return;

  const id = keys.sk;
  logger.log('id', id);
  const res = await userSqlDao.deleteUser(id);
  logger.log('res', res);
  return res;
}

const ddbStreamRecordHandler = new DdbStreamRecordHandler();
ddbStreamRecordHandler.addHandler(putUserHandler);
ddbStreamRecordHandler.addHandler(updateUserHandler);
ddbStreamRecordHandler.addHandler(deleteUserHandler);

export { ddbStreamRecordHandler };
export { putUserHandler };
