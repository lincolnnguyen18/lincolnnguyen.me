import Nav from 'components/Nav';
import AppContainer from 'components/AppContainer';
import { Colors } from 'common/data';

export default function DemosScreen () {
  return (
    <AppContainer>
      <Nav className='text-white justify-center' backgroundColor={Colors.DemosApp}>
        <span className='font-semibold'>Demos</span>
      </Nav>
    </AppContainer>
  );
}
