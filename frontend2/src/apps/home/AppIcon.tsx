import CustomLink, { CustomLinkProps } from 'components/CustomLink';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import { screens } from 'tailwindcss/defaultTheme';
import { twMerge } from 'tailwind-merge';

interface Props extends CustomLinkProps {
  abbreviation: string;
  name: string;
}

export default function AppIcon (props: Props) {
  const { name, abbreviation, className, ...remainingProps } = props;
  const mergedClassName = twMerge('active:brightness-75 hover:brightness-95 flex items-center justify-center sm:w-20 sm:h-20 w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer', className);

  const { screenWidth } = useSelector(commonSelector);

  let nameDiv = (
    <span className='text-xs whitespace-nowrap tracking-normal font-semibold text-white sm:text-sm drop-shadow'>{name}</span>
  );

  // limit name length depending on screen width
  // desktop : mobile
  const nameLengthLimit = screenWidth > parseInt(screens.sm) ? 12 : 11;
  if (name.length > nameLengthLimit) {
    nameDiv = (
      <span className='text-xs whitespace-nowrap tracking-tighter font-semibold text-white sm:text-sm drop-shadow'>
        {name.slice(0, nameLengthLimit - 3)}...
      </span>
    );
  };

  return (
    <div className='flex flex-col items-center justify-center w-fit'>
      <CustomLink className={mergedClassName} imitateButton={false} {...remainingProps}>
        <span className='text-2xl sm:text-3xl font-semibold'>{abbreviation}</span>
      </CustomLink>
      {nameDiv}
    </div>
  );
}
