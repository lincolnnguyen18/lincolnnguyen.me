import { removeEmptyLines, splitText, translate } from './stringUtils';
import { wait } from './timeUtils';

export class Translator {
  constructor ({ targetLang = 'en' }) {
    this.targetLang = targetLang;
  }

  setTargetLanguage (lang) {
    this.targetLang = lang;
  }

  async translate (text) {
    text = removeEmptyLines(text);
    const chunks = splitText(text);
    const minWait = 100;
    const maxWait = 500;
    let res = '';

    for (let i = 0; i < chunks.length; i++) {
      let chunk = chunks[i];
      const { translated } = await translate(chunk);
      if (this.targetLang !== 'ja' && this.targetLang !== 'zh' && this.targetLang !== 'ko') {
        res += translated + ' ';
      } else {
        res += translated;
      }
      const waitTime = Math.floor(Math.random() * (maxWait - minWait + 1)) + minWait;
      // console.log(`Progress: ${(i + 1) / chunks.length * 100}%`);
      await wait(waitTime);
    }

    return res;
  }
}
