import Nav from 'components/Nav';
import AppContainer from 'components/AppContainer';
import LimitWidthContainer from 'components/LimitWidthContainer';
import { Colors } from 'common/data';
import { BackButton } from 'components/CustomLink';

export default function DemosScreen () {
  return (
    <AppContainer>
      <Nav className='text-white' backgroundColor={Colors.DemosApp} text="Demos">
        <LimitWidthContainer isInNav={true}>
          <BackButton text="Apps" to="/" />
        </LimitWidthContainer>
      </Nav>
    </AppContainer>
  );
}
