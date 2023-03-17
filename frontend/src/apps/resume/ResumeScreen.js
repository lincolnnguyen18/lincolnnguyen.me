import { BackButton } from '../../components/BackButton';
import { Navbar } from '../../components/Navbar';
import { NavbarBlur } from '../../components/NavbarBlur';
import { OverflowContainer } from '../../components/OverflowContainer';

export function ResumeScreen () {
  return (
    <>
      <NavbarBlur className='bg-green-custom' />
      <Navbar>
        <BackButton linkPath='/' text='Apps' />
        <span className='font-semibold absolute left-1/2 transform -translate-x-1/2'>Resume</span>
      </Navbar>
      <OverflowContainer>
        <span>Resume</span>
      </OverflowContainer>
    </>
  );
}
