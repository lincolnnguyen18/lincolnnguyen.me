import { Translator } from './Translator';
import { text, transcriptText } from './testData';

describe('Translator', () => {
  it('should translate text', async () => {
    const translator = new Translator({});
    const { translated } = await translator.translate(text);
    console.log(translated);
  });

  it('should translate transcript text', async () => {
    const translator = new Translator({});
    const { translated } = await translator.translate(transcriptText);
    console.log(translated);
  });
});
