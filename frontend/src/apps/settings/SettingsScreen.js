import { BackButton } from '../../components/BackButton';
import { Navbar } from '../../components/Navbar';
import { NavbarBlur } from '../../components/NavbarBlur';
import { OverflowContainer } from '../../components/OverflowContainer';

export function SettingsScreen () {
  return (
    <>
      <NavbarBlur className='bg-gray-custom' />
      <Navbar>
        <BackButton linkPath='/' text='Apps' />
        <span className='font-semibold absolute left-1/2 transform -translate-x-1/2'>Settings</span>
      </Navbar>
      <OverflowContainer>
        <span>Settings</span>
      </OverflowContainer>
    </>
  );
}
