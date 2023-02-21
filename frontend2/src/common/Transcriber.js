export class Transcriber {
  constructor ({ onInterim, onFinal, lang = 'en-US' }) {
    this.onInterim = onInterim;
    this.onFinal = onFinal;
    window.timeSinceLastResult = 0;
    this.interval = null;
    // eslint-disable-next-line new-cap
    window.recognition = new window.webkitSpeechRecognition();
    window.recognition.continuous = true;
    window.recognition.interimResults = true;
    window.recognition.lang = lang;

    function onResult (e) {
      window.timeSinceLastResult = 0;
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
    const timeoutAfter = 3;
    this.interval = setInterval(() => {
      console.log('Time since last result: ', window.timeSinceLastResult);
      if (window.timeSinceLastResult > timeoutAfter) {
        window.recognition.stop();
        window.timeSinceLastResult = 0;
        console.log('Restarted due to timeout');
      } else {
        window.timeSinceLastResult += 1;
      }
    }, 1000);
  }

  stop () {
    window.recognition.stop();
    clearInterval(this.interval);
  }

  setLanguage (lang) {
    window.recognition.lang = lang;
  }
}
