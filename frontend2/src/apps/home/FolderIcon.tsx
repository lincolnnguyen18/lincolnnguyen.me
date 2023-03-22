import { AppData } from 'common/data';
import { LinkProps } from 'react-router-dom';

interface FolderIconProps extends LinkProps {
  name: string;
  apps: AppData[];
}

export default function FolderIcon (props: FolderIconProps) {
  const { name, className } = props;
  return (
    <div className={`flex flex-col items-center justify-center w-fit ${className}`}>
      <div className='flex flex-col items-center justify-center w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer bg-gray-500'>
        <span className='text-2xl sm:text-3xl font-semibold'>F</span>
      </div>
      <span className='text-xs whitespace-nowrap tracking-normal font-semibold text-white sm:text-sm drop-shadow'>{name}</span>
    </div>
  );
}
