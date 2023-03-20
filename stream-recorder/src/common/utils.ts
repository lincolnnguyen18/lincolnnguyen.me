import { PutObjectCommand } from '@aws-sdk/client-s3';
import { spawn } from 'child_process';
import { s3Client } from 'common/clients';
import { environment } from 'common/environment';
import { createReadStream, readdirSync, unlinkSync } from 'fs';

enum Resolution {
  Low = '160:120',
  Medium = '320:240',
  High = '720:480'
}

async function uploadFile (path: string, key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: environment.API_S3_BUCKET_NAME,
    Key: key,
    Body: createReadStream(path),
    ContentType: contentType,
  });
  return s3Client.send(command);
}

/**
 * @param {number} duration - In seconds.
 */
function downloadHlsStream (url: string, filename: string, resolution: Resolution, duration: number) {
  const path = `temp/${filename}.mp4`;
  const args = [
    '-i', url,
    '-t', duration.toString(),
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-b:v', '50k',
    '-vf', `scale=${resolution}`,
    '-c:a', 'copy',
    path,
  ];

  const process = spawn('ffmpeg', args);

  process.on('close', async (code) => {
    if (code === 0) {
      console.log(`Download for ${filename} complete`);
      await uploadFile(path, filename, 'video/mp4');
      console.log(`Upload for ${filename} complete`);
      unlinkSync(path);
    } else {
      console.log(`Download failed for ${filename} with code ${code}`);
    }
  });

  // log stdout and stderr
  process.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  process.stderr.on('data', (data) => {
    console.error(data.toString());
  });
}

/**
 * Custom setInterval function that calls the callback function immediately when called.
 */
function setIntervalCustom (callback: () => void, interval: number) {
  callback();
  return setInterval(callback, interval);
}

/**
 * Return a promise that does not resolve until the directory is empty.
 */
function directoryIsEmpty (directory: string) : Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const files = readdirSync(directory);
      if (files.length === 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

function countDownFrom (seconds: number, message: string) {
  // count down from seconds
  const interval = setInterval(() => {
    const minutesRemaining = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsRemaining = (seconds % 60).toString().padStart(2, '0');
    console.log(`${minutesRemaining}:${secondsRemaining} ${message}`);
    seconds--;
    if (seconds === 0) {
      clearInterval(interval);
    }
  }, 1000);
}

export { uploadFile, downloadHlsStream, setIntervalCustom, directoryIsEmpty, countDownFrom };
export { Resolution };
