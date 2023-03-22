import theme from 'tailwindcss/defaultTheme';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import { twMerge } from 'tailwind-merge';
import CustomLink, { CustomLinkProps } from 'components/CustomLink';

interface AppIconProps extends Omit<CustomLinkProps, 'to'> {
  className?: string;
  abbreviation: string;
  name: string;
  path: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function AppIcon (props: AppIconProps) {
  const { disabled = false, path, name, abbreviation, onClick } = props;
  const className = twMerge('active:brightness-75 hover:brightness-95 flex items-center justify-center sm:w-20 sm:h-20 w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer', props.className);

  const { screenWidth } = useSelector(commonSelector);

  let nameDiv = (
    <span className='text-xs whitespace-nowrap tracking-normal font-semibold text-white sm:text-sm drop-shadow'>{name}</span>
  );

  // limit name length depending on screen width
  const nameLengthLimit = screenWidth > parseInt(theme.screens.sm) ? 12 : 11;
  if (name.length > nameLengthLimit) {
    nameDiv = (
      <span className='text-xs whitespace-nowrap tracking-tighter font-semibold text-white sm:text-sm drop-shadow'>
        {name.slice(0, nameLengthLimit - 3)}...
      </span>
    );
  };

  return (
    <div className='flex flex-col items-center justify-center w-fit'>
      <CustomLink className={className} to={path} disabled={disabled} onClick={onClick}>
        <span className='text-2xl sm:text-3xl font-semibold'>{abbreviation}</span>
      </CustomLink>
      {nameDiv}
    </div>
  );
}
