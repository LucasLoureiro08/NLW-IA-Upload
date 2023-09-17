import { FFmpeg } from '@ffmpeg/ffmpeg';
import {toBlobURL} from '@ffmpeg/util'

const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.3/dist/umd'
// import coreURL from '../ffmpeg/ffmpeg-core.js?url';
// import wasmURL from '../ffmpeg/ffmpeg-core.wasm?url';
// import workerURL from '../ffmpeg/ffmpeg-worker.js?url';

let ffmpeg: FFmpeg | null;

async function getFFmpeg() {
  if (ffmpeg) {
    return ffmpeg
  }

  ffmpeg = new FFmpeg();

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      // coreURL,
      // wasmURL,
      // workerURL,
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),

    });
  }

  return ffmpeg;
}

export { getFFmpeg };