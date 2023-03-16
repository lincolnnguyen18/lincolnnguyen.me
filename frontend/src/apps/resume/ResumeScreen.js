import { useDispatch } from 'react-redux';
import { Button } from '../../components/Button';
import { Navbar } from '../../components/Navbar';
import { NavbarBlur } from '../../components/NavbarBlur';
import { OverflowContainer } from '../../components/OverflowContainer';
import { WhiteVignette } from '../../components/WhiteVignette';
import { commonActions } from '../../slices/commonSlice';

export function ResumeScreen () {
  const dispatch = useDispatch();

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  return (
    <>
      <NavbarBlur className="bg-green-custom" />
      <Navbar>
        <Button className="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Resume</span>
        <Button className="icon-add" />
      </Navbar>
      <WhiteVignette />
      <OverflowContainer>
        <span>Resume</span>
      </OverflowContainer>
    </>
  )
}
