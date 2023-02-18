export class Transcriber {
  constructor ({ onInterim, onFinal, lang = 'en-US' }) {
    this.onInterim = onInterim;
    this.onFinal = onFinal;
    // eslint-disable-next-line new-cap
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = lang;

    function onResult (e) {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        for (let j = 0; j < e.results[i].length; j++) {
          if (e.results[i].isFinal) {
            final += e.results[i][j].transcript;
            onFinal(final);
          } else {
            interim += e.results[i][j].transcript;
            onInterim(interim);
          }
        }
      }
    }

    this.recognition.addEventListener('result', onResult);
  }

  start () {
    this.recognition.start();
  }

  stop () {
    this.recognition.stop();
  }

  setLanguage (lang) {
    this.recognition.lang = lang;
  }
}
