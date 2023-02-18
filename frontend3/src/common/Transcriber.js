export class Transcriber {
  constructor ({ onInterim, onFinal, lang = 'en-US' }) {
    this.onInterim = onInterim;
    this.onFinal = onFinal;
    // eslint-disable-next-line new-cap
    window.recognition = new window.webkitSpeechRecognition();
    window.recognition.continuous = true;
    window.recognition.interimResults = true;
    window.recognition.lang = lang;

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

    window.recognition.addEventListener('result', onResult);
  }

  start () {
    window.recognition.start();
  }

  stop () {
    window.recognition.stop();
  }

  setLanguage (lang) {
    window.recognition.lang = lang;
  }
}
