import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AppIcon ({ bgColor, text, placeholderInitials, path }) {
  const navigate = useNavigate();

  function handleClick () {
    navigate(path);
  }

  return (
    <div className="flex flex-col items-center justify-center w-fit">
      <div
        className={`bg-${bgColor} active:brightness-75 hover:brightness-95 flex items-center justify-center sm:w-20 sm:h-20 w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer transition-all duration-300 active:opacity-100`}
        onClick={handleClick}
      >
        <span className="text-2xl sm:text-3xl transition-text duration-300">{placeholderInitials}</span>
      </div>
      <span className="text-xs font-semibold text-white sm:text-sm transition-text duration-300 drop-shadow">{text}</span>
    </div>
  );
}
