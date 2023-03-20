import { streamUrls } from 'common/data';
import { countDownFrom, directoryIsEmpty, downloadHlsStream, Resolution, setIntervalCustom } from 'common/utils';

// const url = 'http://redlabmcdn.s.llnwi.net/nv02/ryowa4hd/index.m3u8';
// const filename = `asahi#${Date.now()}`;
// const resolution = Resolution.Medium;
// downloadHlsStream(url, filename, resolution, 5);

// every 1 hour, download a 1 hour, 5 minute clip of each stream
// stop after 24 times
let count = 0;
const intervalDuration = 60 * 60;
const interval1 = setIntervalCustom(async () => {
  if (count <= 24) {
    countDownFrom(intervalDuration, `remaining until next loop (${count}/24)`);
    const timestamp = Date.now();
    for (const [channelName, url] of Object.entries(streamUrls)) {
      const filename = `${channelName}#${timestamp}`;
      const duration = 60 * 60 + 5 * 60;
      await downloadHlsStream(url, filename, Resolution.Low, duration);
    }

    count++;
  } else {
    await directoryIsEmpty('temp');
    clearInterval(interval1);
  }
}, intervalDuration * 1000);
