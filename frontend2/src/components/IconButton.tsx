import { twMerge } from 'tailwind-merge';

export default function IconButton (props: React.HTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  const mergedClassName = twMerge('disabled:opacity-50 active:opacity-50 transition-opacity duration-75 disabled:cursor-not-allowed text-2xl', className);

  return (
    <button className={mergedClassName} {...rest} />
  );
}
