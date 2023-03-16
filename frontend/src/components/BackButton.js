import React from 'react';
import { Link } from 'react-router-dom';

export function BackButton ({ className, linkPath, text = 'Back', onClick, stopPropagation = true, disabled, ...rest }) {
  function handleClick (e) {
    if (stopPropagation && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
    }
    if (!linkPath) {
      onClick && onClick();
    }
  }

  let content = (
    <button
      className={`flex items-center gap-1 cursor-pointer active:opacity-50 transition-opacity duration-75 ${className}`}
      type="button"
      onClick={handleClick}
      {...rest}
    >
      <span className="icon-back text-2xl " />
      <span>{text}</span>
    </button>
  );

  if (disabled) {
    content = (
      <div className={`flex items-center gap-1 cursor-not-allowed select-none opacity-50 ${className}`}>
        <span className="icon-back text-2xl " />
        <span>{text}</span>
      </div>
    );
  }

  if (linkPath && !disabled) {
    return (
      <Link to={linkPath}>
        {content}
      </Link>
    );
  } else {
    return content;
  }
}
