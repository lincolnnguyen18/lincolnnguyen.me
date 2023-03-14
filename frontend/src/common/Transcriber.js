export class Transcriber {
  constructor ({ onInterim, onFinal, lang = 'en-US' }) {
    this.onInterim = onInterim;
    this.onFinal = onFinal;
    window.lastInterim = '';
    window.lastResultTime = null;
    this.interval = null;
    // eslint-disable-next-line new-cap
    window.recognition = new window.webkitSpeechRecognition();
    window.recognition.continuous = true;
    window.recognition.interimResults = true;
    window.recognition.lang = lang;

    function onResult (e) {
      let interim = '';
      let final = '';
      window.lastResultTime = Date.now();
      for (let i = e.resultIndex; i < e.results.length; i++) {
        for (let j = 0; j < e.results[i].length; j++) {
          if (e.results[i].isFinal) {
            final += e.results[i][j].transcript;
            onFinal(final);
            window.lastInterim = '';
          } else {
            interim += e.results[i][j].transcript;
            if (interim !== window.lastInterim) {
              onInterim(interim);
              window.lastInterim = interim;
            }
          }
        }
      }
    }

    function onEnd () {
      if (window.lastInterim.trim() !== '') {
        onFinal(window.lastInterim);
        window.lastInterim = '';
      }
    }

    window.recognition.addEventListener('result', onResult);
    window.recognition.addEventListener('end', onEnd);
  }

  start () {
    try {
      window.recognition.start();
    } catch (e) {
      console.error(e);
      throw e;
    }
    const timeoutAfter = 3;
    const maxResultLength = 70;
    window.lastResultTime = Date.now();
    this.interval = setInterval(() => {
      if (window.cutOffType === 'manual') return;
      const timeSinceLastResult = (Date.now() - window.lastResultTime) / 1000;
      // console.log('Time since last result: ', timeSinceLastResult);
      const timeout = timeSinceLastResult > timeoutAfter;
      const tooLong = window.lastInterim.length > maxResultLength;
      if (timeout || tooLong) {
        window.recognition.stop();
        // window.timeSinceLastResult = 0;
        window.lastResultTime = Date.now();
        // if (timeout) {
        //   console.log('Restarted due to timeout');
        //   window.alert('Restarted due to timeout');
        // }
      }
    }, 1000);
  }

  stop () {
    window.recognition?.stop();
    clearInterval(this.interval);
  }

  setLanguage (lang) {
    window.recognition.lang = lang;
  }
}
