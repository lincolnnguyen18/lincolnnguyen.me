import { twMerge } from 'tailwind-merge';

export default function SnapScrollContainer (props: React.HTMLAttributes<HTMLDivElement>) {
  const className = twMerge('snap-start shrink-0 w-screen', props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
