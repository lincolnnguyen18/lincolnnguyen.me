import { downloadHlsStream, Resolution } from 'common/utils';

const url = 'http://redlabmcdn.s.llnwi.net/nv02/ryowa4hd/index.m3u8';
const filename = `asahi#${Date.now()}`;
const resolution = Resolution.Medium;

downloadHlsStream(url, filename, resolution, 5);
