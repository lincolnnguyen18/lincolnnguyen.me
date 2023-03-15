import { unmarshall } from '@aws-sdk/util-dynamodb';
import { logger } from '../common/utils.mjs';
import { Handler } from '../common/Handler.mjs';
import { transcribeSqlDao } from '../daos/transcribeSqlDao.mjs';
import { fileDao } from '../daos/fileDao.mjs';

async function putTranscriptHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'INSERT' && keys.pk.startsWith('userTranscripts#');
  }
  if (!canHandle()) return;
  console.log('putTranscriptHandler');

  const userId = keys.pk.split('#')[1];
  const id = keys.sk.split('#')[1];
  // console.log('userId', userId);
  // console.log('id', id);
  const newImage = unmarshall(record.dynamodb.NewImage);
  console.log('newImage', newImage);
  const res = await transcribeSqlDao.putTranscript({
    ...newImage,
    userId,
    id,
    createdAt: newImage.transcriptCreatedAt,
    updatedAt: newImage.transcriptUpdatedAt,
  });
  logger.log('res', res);
  return res;
}

async function updateTranscriptHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'MODIFY' && keys.pk.startsWith('userTranscripts#');
  }
  if (!canHandle()) return;
  console.log('updateTranscriptHandler');

  const userId = keys.pk.split('#')[1];
  const id = keys.sk.split('#')[1];
  logger.log('userId', userId);
  logger.log('id', id);
  const newImage = unmarshall(record.dynamodb.NewImage);
  console.log('newImage', newImage);
  const res = await transcribeSqlDao.updateTranscript({
    ...newImage,
    userId,
    id,
    createdAt: newImage.transcriptCreatedAt,
    updatedAt: newImage.transcriptUpdatedAt,
  });
  logger.log('res', res);
  return res;
}

async function deleteTranscriptHandler (record, keys) {
  function canHandle () {
    return record.eventName === 'REMOVE' && keys.pk.startsWith('userTranscripts#');
  }
  if (!canHandle()) return;
  console.log('deleteTranscriptHandler');

  const userId = keys.pk.split('#')[1];
  const id = keys.sk.split('#')[1];
  logger.log('userId', userId);
  logger.log('id', id);
  let res = await transcribeSqlDao.deleteTranscript(id);
  logger.log('sql delete res', res);

  res = await fileDao.deleteDirectory(`${userId}/transcribe/${id}`);
  console.log('s3 delete res', res);
  return res;
}

const transcribeHandlers = new Handler();
transcribeHandlers.addHandler(putTranscriptHandler);
transcribeHandlers.addHandler(updateTranscriptHandler);
transcribeHandlers.addHandler(deleteTranscriptHandler);

export { transcribeHandlers };
