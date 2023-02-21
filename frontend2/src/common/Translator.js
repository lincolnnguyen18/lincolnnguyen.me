import { tokenize } from 'wakachigaki';

export class Translator {
  constructor ({ targetLang = 'en' }) {
    this.targetLang = targetLang;
  }

  setTargetLanguage (lang) {
    this.targetLang = lang;
  }

  translate (text) {
    const tokens = tokenize(text);
    console.log(tokens);
  }
}
