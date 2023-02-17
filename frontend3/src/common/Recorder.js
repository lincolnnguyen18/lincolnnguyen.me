export class Recorder {
  constructor ({ onRecordingReady }) {
    this.onRecordingReady = onRecordingReady;

    const setupRecorder = (stream) => {
      this.mediaRecorder = new window.MediaRecorder(stream);
      this.mediaRecorder.addEventListener('dataavailable', e => this.onRecordingReady(URL.createObjectURL(e.data)));
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => setupRecorder(stream))
      .catch(err => console.log(err));
  }

  start () {
    this.mediaRecorder.start();
  }

  stop () {
    this.mediaRecorder.stop();
  }
}
