import { getSignedUrl as cloudfrontGetSignedUrl } from '@aws-sdk/cloudfront-signer';
import { getSignedUrl as s3GetSignedUrl } from '@aws-sdk/s3-request-presigner';
import { environment } from '../common/environment.js';
import { GetObjectCommand, DeleteObjectCommand, DeleteObjectsCommand, ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../common/clients.js';
import { uuid } from '../common/stringUtils.js';
import { exec } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';

class FileDao {
  async getFile (s3ObjectKey) {
    const url = `${environment.CLOUDFRONT_DISTRIBUTION_DOMAIN}/${s3ObjectKey}`;
    return cloudfrontGetSignedUrl({
      url,
      keyPairId: environment.CLOUDFRONT_KEY_PAIR_ID,
      privateKey: environment.CLOUDFRONT_PRIVATE_KEY,
      // expire in 1 hour
      dateLessThan: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  async getFileDirect (s3ObjectKey) {
    const command = new GetObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
    });
    return s3GetSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
  }

  async putFile (s3ObjectKey) {
    const command = new PutObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
    });
    return s3GetSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
  }

  async deleteFile (s3ObjectKey) {
    return s3Client.send(new DeleteObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
    }));
  }

  async deleteDirectory (s3ObjectKey) {
    const listObjectsCommand = new ListObjectsCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Prefix: s3ObjectKey,
    });
    const listObjectsResponse = await s3Client.send(listObjectsCommand);
    const Objects = listObjectsResponse.Contents?.map(({ Key }) => ({ Key }));
    if (!Objects) return;
    const deleteObjectsCommand = new DeleteObjectsCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Delete: { Objects },
    });
    return s3Client.send(deleteObjectsCommand);
  }

  async convertWebmAudioToM4a (s3ObjectKey) {
    // download the webm audio file from s3
    const command = new GetObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
      ContentType: 'audio/webm',
    });
    const tempFileId = uuid();
    const inputPath = `./temp/${tempFileId}.webm`;
    const outputPath = `./temp/${tempFileId}.m4a`;
    const data = await s3Client.send(command);

    let errors = [];

    // if more than 500 mb, return error
    const maxFileSize = 500 * 1024 * 1024;
    const fileSize = data.ContentLength;
    console.log('webm audio file size', fileSize);
    if (fileSize > maxFileSize) {
      errors = ['Audio file too long'];
    } else {
      console.log('downloading webm audio file from s3');
      const writeStream = fs.createWriteStream(inputPath);
      data.Body.pipe(writeStream);
      try {
        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });
      } catch (err) {
        console.log('writeStream error');
        errors = ['An unknown error occurred'];
      }
    }

    console.log('confirming webm audio file was downloaded');
    try {
      if (errors.length === 0 && await fsPromises.access(inputPath).then(() => true).catch(() => false)) {
        // log file size of webm audio file
        const fileSize = fs.statSync(inputPath).size;
        console.log('webm audio file size', fileSize);

        // convert the webm audio file to m4a
        // run ffmpeg -i inputPath -vn outputPath
        console.log('converting webm audio file to m4a');
        errors = await new Promise((resolve) => {
          // timeout in 3 minutes
          // const timeout = 3 * 60 * 1000;
          // const timeout = 10;
          // exec(`ffmpeg -i ${inputPath} -vn ${outputPath}`, { timeout }, (e) => {
          exec(`ffmpeg -i ${inputPath} -vn ${outputPath}`, (e) => {
            if (e) {
              console.log('ffmpeg error', e);
              resolve(['An unknown error occurred']);
            } else {
              resolve([]);
            }
          });
        });
      }
    } catch (err) {
      console.log('writeStream error', err);
    }

    // console.log('errors', errors);
    // check if the m4a audio file exists
    if (errors.length === 0 && !await fsPromises.access(outputPath).then(() => true).catch(() => false)) {
      console.log('m4a audio file does not exist');
      errors = ['An unknown error occurred'];
    }
    if (errors.length === 0) {
      // upload the m4a audio file to s3
      console.log('uploading m4a audio file to s3');
      const uploadCommand = new PutObjectCommand({
        Bucket: environment.API_S3_BUCKET_NAME,
        Key: s3ObjectKey.replace('.webm', '.m4a'),
        Body: fs.createReadStream(outputPath),
        Metadata: { 'Content-Type': 'audio/m4a' },
      });
      await s3Client.send(uploadCommand);
    }
    // delete the webm audio file from s3
    console.log('deleting webm audio file from s3');
    await s3Client.send(new DeleteObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
    }));
    // delete the webm and m4a audio files from the temp directory
    try {
      console.log('deleting webm and m4a audio files from temp directory');
      await fsPromises.unlink(inputPath);
      await fsPromises.unlink(outputPath);
    } catch { }
    console.log('convertWebmAudioToM4a errors', errors);

    return errors;
  }
}

const fileDao = new FileDao();

export { FileDao, fileDao };
