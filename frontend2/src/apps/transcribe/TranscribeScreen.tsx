import Nav from 'components/Nav';
import AppContainer from 'components/AppContainer';
import LimitWidthContainer from 'components/LimitWidthContainer';
import AppBackground from 'components/AppBackground';
import FadeInOnLoad from 'components/FadeInOnLoad';
import IconButton from 'components/IconButton';
import { Colors } from 'common/data';
import { BackButton } from 'components/CustomLink';

export default function TranscribeScreen () {
  return (
    <AppContainer>
      <Nav className='text-white' backgroundColor={Colors.TranscribeApp} text="Transcripts">
        <LimitWidthContainer className='flex justify-between pr-3'>
          <BackButton text="Apps" to="/" />
          <IconButton className='icon-more-horiz' />
        </LimitWidthContainer>
      </Nav>
      <FadeInOnLoad>
        <AppBackground />
      </FadeInOnLoad>
    </AppContainer>
  );
}
