export class Recorder {
  constructor ({ onRecordingReady, onRecordingStop }) {
    this.onRecordingReady = onRecordingReady;

    const setupRecorder = (stream) => {
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
      .catch(err => console.log(err));
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
    window.mediaRecorder.stop();
  }
}
