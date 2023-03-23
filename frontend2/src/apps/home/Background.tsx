import { Colors } from 'common/data';
import { twMerge } from 'tailwind-merge';
import FadeInOnLoad from 'components/FadeInOnLoad';

export default function Background (props: React.HTMLAttributes<HTMLDivElement>) {
  const { className } = props;
  const mergedClassName = twMerge('w-full max-w-screen-2xl fixed left-1/2 transform -translate-x-1/2 xl:blur-3xl lg:blur-2xl md:blur-none top-[-50%] bottom-[-50%] z-[-1] transition-all duration-200 ease-out', className);

  return (
    <FadeInOnLoad fadeOnNavigationPop={false}>
      <div
        className={mergedClassName}
        style={{ backgroundColor: Colors.Background }}
      />
    </FadeInOnLoad>
  );
}
