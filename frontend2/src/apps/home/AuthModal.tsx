import LimitWidthContainer from 'components/LimitWidthContainer';
import Menu, { MenuProps } from 'components/Menu';

// TODO: finish auth modal
export default function AuthModal (props: MenuProps) {
  const { isOpen, onClose } = props;

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <LimitWidthContainer className='px-3 flex flex-col'>
        <span className='text-lg font-semibold'>Login</span>
        <button className='w-fit' onClick={onClose}>Cancel</button>
      </LimitWidthContainer>
    </Menu>
  );
}
