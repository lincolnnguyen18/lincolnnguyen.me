import { twMerge } from 'tailwind-merge';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isInNav?: boolean;
}

export default function LimitWidthContainer (props: Props) {
  const { isInNav = false } = props;
  const className = twMerge('max-w-screen-sm mx-auto pt-11', isInNav && 'pt-0 w-full', props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}