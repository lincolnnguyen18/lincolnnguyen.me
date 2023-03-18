import fs from 'fs';
import { spawn } from 'child_process';
import { s3Client } from '../aws-cdk/lambda/common/clients.mjs';
import { environment } from './common/environment.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';

const streamUrls = {
  nhke: 'http://redlabmcdn.s.llnwi.net/nv02/ryowa1hd/index.m3u8',
  nhkg: 'http://redlabmcdn.s.llnwi.net/nv02/ryowa2hd/index.m3u8',
  ntv: 'http://example.com/path/to/stream3.m3u8',
  asahi: 'http://redlabmcdn.s.llnwi.net/nv02/ryowa4hd/index.m3u8',
  tbs: 'http://redlabmcdn.s.llnwi.net/nv02/ryowa5hd/index.m3u8',
  tvtokyo: 'http://redlabmcdn.s.llnwi.net/nv02/ryowa6hd/index.m3u8',
  fuji: 'http://redlabmcdn.s.llnwi.net/nv02/ryowa7hd/index.m3u8',
  tokyomx: 'http://redlabmcdn.s.llnwi.net/nv02/ryowa8hd/index.m3u8'
};

const fileSizes = {};
const toCheck = [];

// Start recording for each stream URL
for (const [name, url] of Object.entries(streamUrls)) {
  startRecording(name, url);
}

// Stop recording and restart the process after 30 minutes
global.partLength = 30 * 60 * 1000;
// Stop recording and restart the process after 5 seconds
// const partLength = 5 * 1000;

function startRecording(name, streamUrl) {
  const timestamp = Date.now();
  // save to ./temp/`${name}#${timestamp}.mp4`
  const fileName = `${name}#${timestamp}.mp4`;
  fileSizes[fileName] = -1;
  const ffmpegCommand = `ffmpeg -i "${streamUrl}" -c:v libx264 -preset ultrafast -c:a copy temp/${fileName}`;

  // Spawn a new FFmpeg process and start recording
  const ffmpegProcess = spawn(ffmpegCommand, [], {
    detached: true,
    shell: true,
  });

  setTimeout(() => {
    toCheck.push(fileName);
    ffmpegProcess.kill();
    startRecording(name, streamUrl);
    // clearInterval(interval);
  }, global.partLength);
}

// log seconds remaining by counting down from partLength to 0 then restarting from partLength
setInterval(() => {
  global.partLength -= 1000;
  // console.log(global.partLength / 1000);
  // console.log(`Seconds remaining: ${global.partLength / 1000}`);

  // log minutes and seconds remaining
  const minutes = Math.floor(global.partLength / 1000 / 60);
  const seconds = Math.floor(global.partLength / 1000) % 60;
  console.log(`${minutes}:${seconds} remaining`);

  if (global.partLength === 0) {
    global.partLength = 3 * 60 * 1000;
  }
}, 1000);

process.on('exit', () => {
  spawn('pkill', ['ffmpeg']);
});

const toUpload = [];

// Check the file size every second
setInterval(() => {
  // check all files in fileSizes
  for (const [name, size] of Object.entries(fileSizes)) {
    try {
      const currentSize = fs.statSync(`temp/${name}`).size;
      const isValid = checkIfMp4FileIsValid(`temp/${name}`);
      if (size === currentSize && toCheck.includes(name) && isValid) {
        // file is done writing
        toUpload.push(name);
        toCheck.splice(toCheck.indexOf(name), 1);
        delete fileSizes[name];
      } else {
        fileSizes[name] = currentSize;
      }
    } catch (err) {
      // console.error(err);
    }
  }

  // console.log(toUpload);
}, 10000);

// check temp directory every 5 seconds and log contents
setInterval(async () => {
  for (let i = 0; i < toUpload.length; i++) {
    const file = toUpload[i];
    toUpload.splice(i, 1);
    
    const [name, timestamp] = file.split('#');
    // console.log(name, timestamp);

    const s3Key = `${name}/${timestamp}`;
    // upload file
    console.log(`Uploading ${file} to ${s3Key}`);
    await s3Client.send(new PutObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3Key,
      Body: fs.createReadStream(`temp/${file}`),
      ContentType: 'video/mp4',
    }));
    console.log(`Uploaded ${file} to ${s3Key}`);
    // delete file
    // console.log(`Deleting ${file}`);
    fs.unlinkSync(`temp/${file}`);
    console.log(`Deleted ${file}`);
  }
}, 1000);

function checkIfMp4FileIsValid (path) {
  return new Promise((resolve) => {
    const ffmpegCommand = `ffmpeg -v error -i "${path}" -f null -`;
    const ffmpegProcess = spawn(ffmpegCommand, [], {
      detached: true,
      shell: true,
    });
    ffmpegProcess.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

// async function main () {
//   // const path = '/Users/lincolnnguyen/repos/tv/1679148322013.mp4';
//   const path = '/Users/lincolnnguyen/repos/tv/output_file_name.mp4';
//   const isValid = await checkIfMp4FileIsValid(path);
//   console.log('isValid', isValid);
// }

// main();
