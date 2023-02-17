export class Recorder {
  constructor ({ onRecordingReady }) {
    this.onRecordingReady = onRecordingReady;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => this.setupRecorder(stream))
      .catch(err => console.log(err));
  }

  setupRecorder (stream) {
    this.mediaRecorder = new window.MediaRecorder(stream);
    this.mediaRecorder.addEventListener('dataavailable', e => this.onRecordingReady(URL.createObjectURL(e.data)));
  }

  start () {
    this.mediaRecorder.start();
  }

  stop () {
    this.mediaRecorder.stop();
  }
}
