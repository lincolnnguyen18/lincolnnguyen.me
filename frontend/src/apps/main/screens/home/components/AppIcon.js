import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AppIcon ({ bgColor, text, placeholderInitials, path }) {
  const navigate = useNavigate();

  function handleClick () {
    navigate(path);
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-fit"
      onClick={handleClick}
    >
      <div className={bgColor + ' flex items-center justify-center w-16 h-16 rounded-2xl m-2 text-white cursor-pointer hover:opacity-90'}>
        <span className="text-2xl">{placeholderInitials}</span>
      </div>
      <span className="text-xs">{text}</span>
    </div>
  );
}
