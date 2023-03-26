import fs from 'fs';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbClient } from '../common/clients.js';

async function dumpTable (tableName) {
  // scan table and dump as json to current directory as tableName.json
  const params = {
    TableName: tableName,
  };
  const scanResults = [];
  let items;
  do {
    items = await ddbClient.send(new ScanCommand(params));
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== 'undefined');

  fs.writeFileSync(`src/scripts/${tableName}.json`, JSON.stringify(scanResults, null, 2));
}

function parseUsers (table) {
  // get each item in dump that has pk === 'userData'
  // get id, username, password, playbackSpeed, transcribeLang, translateLang, transcribeCutOffType, createdAt, updatedAt

  const users = [];
  table.forEach((item) => {
    if (item.pk === 'userData') {
      const user = {
        id: item.sk,
        username: item.username,
        password: item.password,
        playbackSpeed: item.playbackSpeed,
        transcribeLang: item.transcribeLang,
        translateLang: item.translateLang,
        transcribeCutOffType: item.transcribeCutOffType,
        createdAt: item.userCreatedAt,
        updatedAt: item.userUpdatedAt,
      };
      users.push(user);
    }
  });
  return users;
}

function parseTranscripts (table) {
  // get each item in dump that has pk === 'userTranscripts#'
  // get userId, id, title, partsKey, partsOrder, preview, createdAt, updatedAt

  const transcripts = [];
  table.forEach((item) => {
    if (item.pk.includes('userTranscripts#')) {
      const transcript = {
        userId: item.pk.split('#')[1],
        id: item.sk.split('#')[1],
        title: item.title,
        partsKey: item.partsKey,
        partsOrder: item.partsOrder,
        preview: item.preview,
        createdAt: item.transcriptCreatedAt,
        updatedAt: item.transcriptUpdatedAt,
      };
      transcripts.push(transcript);
    }
  });
  return transcripts;
}

export { dumpTable, parseUsers, parseTranscripts };
