import React from 'react';
import { Link } from 'react-router-dom';

export function Button ({ twStyle, fontSize = 'text-2xl', linkPath, ...rest }) {
  const content = (
    <button
      className={`select-none cursor-pointer active:opacity-50 transition-opacity duration-75 ${twStyle} ${fontSize}`}
      {...rest}
    />
  );

  if (linkPath) {
    return (
      <Link to={linkPath}>
        {content}
      </Link>
    );
  } else {
    return content;
  }
}
