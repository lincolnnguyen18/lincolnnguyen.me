import { unmarshall } from '@aws-sdk/util-dynamodb';
import { logger } from '../common/utils.mjs';
import { userSqlDao } from '../daos/userSqlDao.mjs';
import { Handler } from '../common/Handler.mjs';

async function putUserHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'INSERT' && keys.pk === 'userData';
  }
  if (!canHandle()) return;
  console.log('putUserHandler');

  const id = keys.sk;
  logger.log('id', id);
  const newImage = unmarshall(record.dynamodb.NewImage);
  console.log('newImage', newImage);
  const res = await userSqlDao.putUser({
    id,
    ...newImage,
    createdAt: newImage.userCreatedAt,
    updatedAt: newImage.userUpdatedAt,
  });
  logger.log('res', res);
  return res;
}

async function updateUserHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'MODIFY' && keys.pk === 'userData';
  }
  if (!canHandle()) return;
  console.log('updateUserHandler');

  const id = keys.sk;
  logger.log('id', id);
  const newImage = unmarshall(record.dynamodb.NewImage);
  console.log('newImage', newImage);
  const res = await userSqlDao.updateUser({
    id,
    ...newImage,
    createdAt: newImage.userCreatedAt,
    updatedAt: newImage.userUpdatedAt,
  });
  logger.log('res', res);
  return res;
}

async function deleteUserHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'REMOVE' && keys.pk === 'userData';
  }
  if (!canHandle()) return;
  console.log('deleteUserHandler');

  const id = keys.sk;
  logger.log('id', id);
  const res = await userSqlDao.deleteUser(id);
  logger.log('res', res);
  return res;
}

const userHandlers = new Handler();
userHandlers.addHandler(putUserHandler);
userHandlers.addHandler(updateUserHandler);
userHandlers.addHandler(deleteUserHandler);

export { userHandlers };
