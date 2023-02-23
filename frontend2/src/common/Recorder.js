export class Recorder {
  constructor ({ onRecordingReady }) {
    this.onRecordingReady = onRecordingReady;

    const setupRecorder = (stream) => {
      window.mediaRecorder = new window.MediaRecorder(stream);
      window.mediaRecorder.addEventListener('dataavailable', e => this.onRecordingReady(URL.createObjectURL(e.data)));
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => setupRecorder(stream))
      .catch(err => console.log(err));
  }

  start () {
    setTimeout(() => {
      if (window.mediaRecorder) {
        window.mediaRecorder.start();
      } else {
        alert('There was an error in starting the recording. Please make sure there are no other tabs open that are using the microphone. Try refreshing the page or using a different computer.');
      }
    }, 1000);
  }

  stop () {
    window.mediaRecorder.stop();
  }
}
