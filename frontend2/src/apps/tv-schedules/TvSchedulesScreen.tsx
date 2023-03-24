import Nav from 'components/Nav';
import AppContainer from 'components/AppContainer';
import LimitWidthContainer from 'components/LimitWidthContainer';
import AppBackground from 'components/AppBackground';
import FadeInOnLoad from 'components/FadeInOnLoad';
import { Colors } from 'common/data';
import { BackButton } from 'components/CustomLink';

export default function TvSchedulesScreen () {
  return (
    <AppContainer>
      <Nav className='text-white' backgroundColor={Colors.TvSchedulesApp} text="TV Schedules">
        <LimitWidthContainer>
          <BackButton text="Apps" to="/" />
        </LimitWidthContainer>
      </Nav>
      <FadeInOnLoad>
        <AppBackground />
      </FadeInOnLoad>
    </AppContainer>
  );
}
