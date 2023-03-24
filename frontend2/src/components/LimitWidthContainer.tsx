import { twMerge } from 'tailwind-merge';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  addNavPadding?: boolean;
}

export default function LimitWidthContainer (props: Props) {
  const { addNavPadding = false } = props;
  const className = twMerge('max-w-screen-sm mx-auto w-full', addNavPadding && 'pt-11', props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
