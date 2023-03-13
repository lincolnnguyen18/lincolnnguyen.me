import { fileGqlClient } from '../gqlClients/fileGqlClient';

async function uploadMp3Audio ({ blobUrl, s3ObjectKey }) {
  const arrayBuffer = await fetch(blobUrl).then(res => res.arrayBuffer());
  const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
  const formData = new FormData();
  formData.append('audio', blob);
  const uploadUrl = await fileGqlClient.uploadFile({ s3ObjectKey });
  return fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'audio/mpeg',
    },
    body: formData.get('audio'),
  });
}

async function uploadJsObject ({ jsObject, s3ObjectKey }) {
  const formData = new FormData();
  formData.append('json', new Blob([JSON.stringify(jsObject)], { type: 'application/json' }));
  const uploadUrl = await fileGqlClient.uploadFile({ s3ObjectKey });
  return fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData.get('json'),
  });
}

async function downloadJsObject (s3ObjectKey) {
  const downloadUrl = await fileGqlClient.getFile({ s3ObjectKey });
  return fetch(downloadUrl).then(res => res.json());
}

async function downloadMp3Audio (s3ObjectKey) {
  return fileGqlClient.getFile({ s3ObjectKey });
}

export { uploadMp3Audio, uploadJsObject, downloadJsObject, downloadMp3Audio };
