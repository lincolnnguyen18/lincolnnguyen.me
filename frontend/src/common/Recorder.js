export class Recorder {
  constructor ({ onRecordingReady, onRecordingStop }) {
    this.onRecordingReady = onRecordingReady;

    const setupRecorder = (stream) => {
      if (window.mediaRecorder) {}
      window.mediaRecorder = new window.MediaRecorder(stream);
      window.mediaRecorder.addEventListener('dataavailable', e => {
        this.onRecordingReady(URL.createObjectURL(e.data));
      });
      window.mediaRecorder.addEventListener('stop', onRecordingStop);
    };

    window.navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setupRecorder(stream);
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  }

  start () {
    try {
      window.mediaRecorder.start();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  stop () {
    window.mediaRecorder?.stop();
  }

  forceStop () {
    this.onRecordingReady = () => {};
    try {
      window.mediaRecorder?.stop();
    } catch {}
  }
}
