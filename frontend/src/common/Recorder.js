import vmsg from 'vmsg';

export class Recorder {
  constructor ({ onRecordingReady, onRecordingStop }) {
    this.recorder = new vmsg.Recorder({ wasmURL: '/vmsg.wasm' });
    this.onRecordingReady = onRecordingReady;
    this.onRecordingStop = onRecordingStop;
  }

  async start () {
    try {
      await this.recorder.initAudio();
      await this.recorder.initWorker();
      this.recorder.startRecording();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async stop () {
    const blob = await this.recorder.stopRecording();
    const objectURL = URL.createObjectURL(blob);
    this.onRecordingReady(objectURL);
    this.onRecordingStop();
  }
}
