import LimitWidthContainer from 'components/LimitWidthContainer';
import LoginModal from 'apps/home/LoginModal';
import { useAppDispatch } from 'common/store';
import { menuActions } from 'slices/menuSlice';
import { openMenu } from 'slices/menuAsyncActions';

export default function RegisterModal () {
  const dispatch = useAppDispatch();

  function openLoginModal () {
    dispatch(openMenu({ menuChildren: <LoginModal />, menuCanBeClosedByClickingOutside: false }));
  }

  return (
    <LimitWidthContainer className='px-3 flex flex-col'>
      <span className='text-lg font-semibold'>Register</span>
      <button className='w-fit' onClick={() => dispatch(menuActions.closeMenu())}>Cancel</button>
      <button className='w-fit' onClick={openLoginModal}>Open Login Modal</button>
    </LimitWidthContainer>
  );
}
