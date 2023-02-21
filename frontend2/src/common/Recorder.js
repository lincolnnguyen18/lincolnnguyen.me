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
    try {
      setTimeout(() => this.mediaRecorder.start(), 100);
    } catch (e) {
      console.log(e);
      window.alert('There was an error in starting the recording. Please try refreshing the page or using a different computer.');
    }
  }

  stop () {
    this.mediaRecorder.stop();
  }
}
