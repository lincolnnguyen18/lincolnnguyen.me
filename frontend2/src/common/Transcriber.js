export class Transcriber {
  constructor ({ onInterim, onFinal, lang = 'en-US' }) {
    this.onInterim = onInterim;
    this.onFinal = onFinal;
    window.lastInterim = '';
    // window.timeSinceLastResult = 0;
    this.interval = null;
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
            // window.timeSinceLastResult = 0;
            window.lastInterim = '';
          } else {
            interim += e.results[i][j].transcript;
            if (interim !== window.lastInterim) {
              onInterim(interim);
              window.lastInterim = interim;
              // window.timeSinceLastResult = 0;
            }
          }
        }
      }
    }

    window.recognition.addEventListener('result', onResult);
  }

  start () {
    window.recognition.start();
    // const timeoutAfter = 2;
    // const maxResultLength = 100;
    // this.interval = setInterval(() => {
    //   // console.log('Time since last result: ', window.timeSinceLastResult);
    //   // console.log('lastInterim length', window.lastInterim?.length);
    //   if (window.timeSinceLastResult > timeoutAfter || window.lastInterim.length > maxResultLength) {
    //     window.recognition.stop();
    //     window.timeSinceLastResult = 0;
    //     console.log('Restarted due to timeout');
    //   } else {
    //     window.timeSinceLastResult += 1;
    //   }
    // }, 700);
  }

  stop () {
    window.recognition.stop();
    clearInterval(this.interval);
  }

  setLanguage (lang) {
    window.recognition.lang = lang;
  }
}
