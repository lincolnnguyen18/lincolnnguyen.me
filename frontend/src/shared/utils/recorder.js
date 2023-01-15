class Recorder {
  constructor ({ onDurationChange, onTimeUpdate, onEnded }) {
    this.player = new Audio();
    this.player.hidden = true;
    this.player.addEventListener('durationchange', () => onDurationChange(this.player));
    this.player.addEventListener('timeupdate', () => onTimeUpdate(this.player));
    this.player.addEventListener('ended', onEnded);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => this.setupRecorder(stream))
      .catch(err => console.log(err));
  }

  onRecordingReady (e) {
    // console.log('recording ready');
    this.player.src = URL.createObjectURL(e.data);
  }

  setupRecorder (stream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.addEventListener('dataavailable', e => this.onRecordingReady(e));
  }

  startRecording () {
    this.player.src = '';
    this.mediaRecorder.start();
    // console.log('recording started');
  }

  stopRecording () {
    this.mediaRecorder.stop();
    // console.log('recording stopped');
  }
}

export { Recorder };
