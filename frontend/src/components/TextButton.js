import React from 'react';
import { Link } from 'react-router-dom';

export function TextButton ({ twStyle, linkPath, children, ...rest }) {
  const content = (
    <button
      className={`cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:opacity-50 transition-opacity duration-75 ${twStyle}`}
      {...rest}
    >
      {children}
    </button>
  );

  if (linkPath) {
    return (
      <Link
        to={linkPath}
      >
        {content}
      </Link>
    );
  } else {
    return content;
  }
}
