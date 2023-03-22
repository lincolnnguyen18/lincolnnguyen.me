import { Link, LinkProps } from 'react-router-dom';

export interface CustomLinkProps extends LinkProps {
  disabled?: boolean;
}

export default function CustomLink ({ to, disabled = false, children, ...props }: CustomLinkProps) {
  if (disabled) {
    return <span {...props}>{children}</span>;
  }

  return <Link to={to} {...props}>{children}</Link>;
}
