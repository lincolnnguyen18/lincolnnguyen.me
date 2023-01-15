import { capitalize } from 'lodash';

class Transcriber {
  constructor ({ onFinalResult, onInterimResult, lang = 'en-US' }) {
    // eslint-disable-next-line new-cap, no-undef
    this.recognition = new webkitSpeechRecognition();
    // window.recognition = this.recognition;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = lang;
    this.onFinalResult = onFinalResult;
    this.onInterimResult = onInterimResult;
    this.lastInterimResult = '';
    this.lastResultTime = 0;
    this.recognition.addEventListener('result', (e) => this.onResult(e));
    this.recognition.addEventListener('error', () => {
      // console.log('error', e);
      try {
        this.recognition.start();
      } catch {}
    });
    this.recognition.addEventListener('end', () => {
      if (this.transcribing) {
        this.recognition.start();
      }
    });
    this.duration = 0;
    this.transcribing = false;
    this.restarting = false;
  }

  start () {
    this.recognition.start();
    this.timer = setInterval(() => {
      this.duration += 0.1;

      if (this.duration - this.lastResultTime > 3000 && !this.restarting) {
        // console.log('timeDifference > 3000');
        this.restarting = true;
        this.recognition.stop();
        setTimeout(() => {
          try {
            this.recognition.start();
            this.restarting = false;
          } catch (e) {
            // console.log('error', e);
          }
          // console.log('recognition restarted');
        }, 100);
      }
    }, 100);
    this.transcribing = true;
    // console.log('recognition started');
  }

  resume () {
    this.recognition.start();
    this.transcribing = true;
  }

  stop () {
    this.recognition.stop();
    clearInterval(this.timer);
    this.transcribing = false;
    // console.log('recognition stopped');
  }

  setLang (lang) {
    this.recognition.lang = lang;
    this.recognition.stop();
    setTimeout(() => this.recognition.start(), 1000);
  }

  onResult (e) {
    let interimTranscript = '';
    let finalTranscript = '';
    for (let i = e.resultIndex; i < e.results.length; i += 1) {
      if (e.results[i].isFinal) {
        finalTranscript += e.results[i][0].transcript;
      } else {
        interimTranscript += e.results[i][0].transcript;
      }
    }
    if (interimTranscript && interimTranscript !== this.lastInterimResult) {
      this.lastInterimResult = interimTranscript;
      interimTranscript = capitalize(interimTranscript.trim());
      this.onInterimResult(interimTranscript);
    }
    if (finalTranscript) {
      this.onFinalResult({ text: capitalize(finalTranscript.trim()), timestamp: this.duration });
    }
    this.lastResultTime = this.duration;
  }
}

export { Transcriber };
