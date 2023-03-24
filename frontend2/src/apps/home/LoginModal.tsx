import LimitWidthContainer from 'components/LimitWidthContainer';
import RegisterModal from 'apps/home/RegisterModal';
import { useAppDispatch } from 'common/store';
import { menuActions } from 'slices/menuSlice';
import { openMenu } from 'slices/menuAsyncActions';
import { fetchToken } from 'slices/userAsyncActions';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';

// TODO: finish login/register modals
export default function LoginModal () {
  const dispatch = useAppDispatch();
  const { isPending } = useSelector(commonSelector);

  const disableButtons = isPending.includes(fetchToken.typePrefix);

  function openRegisterModal () {
    dispatch(openMenu({ menuChildren: <RegisterModal />, menuCanBeClosedByClickingOutside: false }));
  }

  function attemptLogin () {
    dispatch(
      fetchToken({
        email: 'mockEmail',
        password: 'mockPassword',
      }),
    );
  }

  return (
    <LimitWidthContainer className='px-3 flex flex-col'>
      <span className='text-lg font-semibold'>Login</span>
      <button disabled={disableButtons} className='w-fit' onClick={() => dispatch(menuActions.closeMenu())}>Cancel</button>
      <button disabled={disableButtons} className='w-fit' onClick={attemptLogin}>Login</button>
      <button disabled={disableButtons} className='w-fit' onClick={openRegisterModal}>Open Register Modal</button>
    </LimitWidthContainer>
  );
}
