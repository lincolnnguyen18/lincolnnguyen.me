import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector, openLogin } from '../../slices/commonSlice';

export function AppIcon ({ text, placeholderInitials, path, className }) {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(commonSelector);

  let link;

  function handleNotLoggedInClick () {
    dispatch(commonActions.setSlice({ showLogin: path }));
    dispatch(openLogin());
  }

  if (loggedIn) {
    link = (
      <Link
        className={twMerge('active:brightness-75 hover:brightness-95 flex items-center justify-center sm:w-20 sm:h-20 w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer', className)}
        to={loggedIn ? path : '/'}
      >
        <span className="text-2xl sm:text-3xl">{placeholderInitials}</span>
      </Link>
    );
  } else {
    link = (
      <div
        className={twMerge('active:brightness-75 hover:brightness-95 flex items-center justify-center sm:w-20 sm:h-20 w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer', className)}
        onClick={handleNotLoggedInClick}
      >
        <span className="text-2xl sm:text-3xl">{placeholderInitials}</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center w-fit'>
      {link}
      <span className="text-xs font-semibold text-white sm:text-sm drop-shadow">{text}</span>
    </div>
  );
}
