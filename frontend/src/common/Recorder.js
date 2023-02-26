export class Recorder {
  constructor ({ onRecordingReady, onRecordingStop, onRecordingError }) {
    this.onRecordingReady = onRecordingReady;
    this.onRecordingError = onRecordingError;

    const setupRecorder = (stream) => {
      window.mediaRecorder = new window.MediaRecorder(stream);
      window.mediaRecorder.addEventListener('dataavailable', e => this.onRecordingReady(URL.createObjectURL(e.data)));
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
    setTimeout(() => {
      if (window.mediaRecorder) {
        window.mediaRecorder.start();
      } else {
        this.onRecordingError();
      }
    }, 1000);
  }

  stop () {
    window.mediaRecorder.stop();
  }
}
