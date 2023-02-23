import React from 'react';
import { Link } from 'react-router-dom';

export function BackButton ({ twStyle, linkPath, text = 'Back', onClick, stopPropagation = true, ...rest }) {
  function handleClick (e) {
    if (stopPropagation && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
    }
    if (!linkPath) {
      onClick && onClick();
    }
  }

  const content = (
    <button
      className={`flex items-center gap-1 cursor-pointer active:opacity-50 transition-opacity duration-75 ${twStyle}`}
      type="button"
      onClick={handleClick}
      {...rest}
    >
      <span className="icon-back text-2xl " />
      <span>{text}</span>
    </button>
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
