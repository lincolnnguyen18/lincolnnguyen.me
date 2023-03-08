import { fileGqlClient } from '../gqlClients/fileGqlClient';

async function uploadWebmAudio ({ blobUrl, s3ObjectKey }) {
  const arrayBuffer = await fetch(blobUrl).then(res => res.arrayBuffer());
  const blob = new Blob([arrayBuffer], { type: 'audio/webm' });
  const formData = new FormData();
  formData.append('audio', blob);
  const uploadUrl = await fileGqlClient.uploadFile({ s3ObjectKey });
  return fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'audio/webm',
    },
    body: formData.get('audio'),
  });
}

async function uploadObject ({ object, s3ObjectKey }) {
  const formData = new FormData();
  formData.append('json', new Blob([JSON.stringify(object)], { type: 'application/json' }));
  const uploadUrl = await fileGqlClient.uploadFile({ s3ObjectKey });
  return fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData.get('json'),
  });
}

export { uploadWebmAudio, uploadObject };
