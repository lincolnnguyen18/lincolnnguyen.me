import { Translator } from './Translator';

describe('Translator', () => {
  it('should translate text', () => {
    const translator = new Translator();
    translator.translate('こんにちは');
  });
});
