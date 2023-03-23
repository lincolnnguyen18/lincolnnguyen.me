import Nav from 'components/Nav';
import AppContainer from 'components/AppContainer';
import LimitWidthContainer from 'components/LimitWidthContainer';
import Background from 'apps/home/Background';
import { Colors } from 'common/data';
import { BackButton } from 'components/CustomLink';

export default function TranscribeScreen () {
  return (
    <AppContainer>
      <Nav className='text-white' backgroundColor={Colors.TranscribeApp} text="Transcripts">
        <LimitWidthContainer isInNav={true}>
          <BackButton text="Apps" to="/" />
        </LimitWidthContainer>
      </Nav>
      <Background />
    </AppContainer>
  );
}
