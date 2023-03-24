import Nav from 'components/Nav';
import AppContainer from 'components/AppContainer';
import LimitWidthContainer from 'components/LimitWidthContainer';
import AppBackground from 'components/AppBackground';
import FadeInOnLoad from 'components/FadeInOnLoad';
import { Colors } from 'common/data';
import { BackButton } from 'components/CustomLink';

export default function DemosScreen () {
  return (
    <AppContainer>
      <Nav className='text-white' backgroundColor={Colors.DemosApp} text="Demos">
        <LimitWidthContainer>
          <BackButton text="Apps" to="/" />
        </LimitWidthContainer>
      </Nav>
      <FadeInOnLoad>
        <LimitWidthContainer className='text-black' addNavPadding={true}>
          <div className='pt-3 px-3 flex flex-col'>
            <span className='text-xl font-semibold'>Demos</span>
          </div>
        </LimitWidthContainer>
        <AppBackground />
      </FadeInOnLoad>
    </AppContainer>
  );
}
