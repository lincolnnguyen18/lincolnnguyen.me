import { twMerge } from 'tailwind-merge';

interface AppIconProps {
  className?: string;
  abbreviation: string;
  name: string;
}

export default function AppIcon (props: AppIconProps) {
  const className = twMerge('active:brightness-75 hover:brightness-95 flex items-center justify-center sm:w-20 sm:h-20 w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer', props.className);

  return (
    <div className='flex flex-col items-center justify-center w-fit'>
      <div className={className}>
        <span className='text-2xl sm:text-3xl font-semibold'>{props.abbreviation}</span>
      </div>
      <span className='text-xs font-semibold text-white sm:text-sm drop-shadow'>{props.name}</span>
    </div>
  );
}
