import { Link, LinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface CustomLinkProps extends LinkProps {
  disabled?: boolean;
  imitateButton?: boolean;
}

export default function CustomLink (props: CustomLinkProps) {
  const { disabled = false, imitateButton = true, className, children, ...remainingProps } = props;
  if (disabled) {
    let mergedClassName = className;
    // if disabled and imitateButton is true, fade out and show cursor not allowed icon on hover
    if (imitateButton) {
      mergedClassName = twMerge('select-none cursor-not-allowed opacity-50', className);
    }
    return <span className={mergedClassName} {...remainingProps}>{children}</span>;
  } else {
    let mergedClassName = className;
    // if not disabled and imitateButton is true, fade out on hover and when clicked
    if (imitateButton) {
      mergedClassName = twMerge('select-none active:opacity-50 transition-opacity duration-75', className);
    }
    return <Link {...remainingProps} className={mergedClassName}>{children}</Link>;
  }
}

interface BackButtonProps extends CustomLinkProps {
  text: string;
}

export function BackButton (props: BackButtonProps) {
  const { text, className, ...remainingProps } = props;
  const mergedClassName = twMerge('flex items-center gap-1 ml-1', className);

  return (
    <CustomLink className={mergedClassName} {...remainingProps}>
      <span className='icon-back text-2xl' />
      <span>{text}</span>
    </CustomLink>
  );
}
