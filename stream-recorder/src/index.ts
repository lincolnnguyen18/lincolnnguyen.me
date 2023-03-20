import { streamUrls } from 'common/data';
import { downloadHlsStream, Resolution, setIntervalCustom } from 'common/utils';

// const url = 'http://redlabmcdn.s.llnwi.net/nv02/ryowa4hd/index.m3u8';
// const filename = `asahi#${Date.now()}`;
// const resolution = Resolution.Medium;
// downloadHlsStream(url, filename, resolution, 5);

// every 1 hour, download a 1 hour, 5 minute clip of each stream
// stop after 24 times
let count = 0;
const intervalDuration = 60 * 60 * 1000;
setIntervalCustom(async () => {
  const timestamp = Date.now();
  for (const [channelName, url] of Object.entries(streamUrls)) {
    const filename = `${channelName}#${timestamp}`;
    const duration = 60 * 60 + 5 * 60;
    await downloadHlsStream(url, filename, Resolution.Low, duration);
  }
  count++;
  if (count === 24) {
    process.exit(0);
  }

  // log minutes and seconds remaining until loop restarts
  const interval = setInterval(() => {
    let minutes = Math.floor((intervalDuration - Date.now() % intervalDuration) / 60000).toString();
    let seconds = (Math.floor((intervalDuration - Date.now() % intervalDuration) / 1000) % 60).toString();
    // pad both minutes and seconds with 0s
    minutes = minutes.padStart(2, '0');
    seconds = seconds.padStart(2, '0');
    console.log(`${minutes}:${seconds} remaining until next loop (${count}/24)`);
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
  }, intervalDuration);
}, intervalDuration);
