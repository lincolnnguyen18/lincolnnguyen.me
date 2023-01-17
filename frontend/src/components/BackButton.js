import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../slices/sharedSlice';

export function BackButton ({ twStyle, linkPath, automaticBack = false, popHistory = true, size = 'normal', ...rest }) {
  // size = normal, small
  const dispatch = useDispatch();
  const { history } = useSelector(sharedSelector);

  let content;

  if (size === 'normal') {
    content = (
      <button
        className={`flex items-center gap-1 cursor-pointer active:opacity-50 transition-opacity duration-75 ${twStyle}`}
        type="button"
        {...rest}
      >
        <span className="icon-back text-2xl " />
        <span>Back</span>
      </button>
    );
  } else {
    content = (
      <button
        className={`px-2 cursor-pointer active:opacity-50 transition-opacity duration-75 ${twStyle}`}
        type="button"
        {...rest}
      >
        <span className="icon-back text-2xl " />
      </button>
    );
  }

  function onLinkClick (e) {
    if (popHistory && !(e.metaKey || e.ctrlKey)) {
      dispatch(sharedActions.popHistory());
    }
  }

  function getAutomaticBackPath () {
    const previousScreen = history[history.length - 2];
    return previousScreen?.path || '/';
  }

  if (linkPath) {
    return (
      <Link
        to={linkPath}
        onClick={onLinkClick}
      >
        {content}
      </Link>
    );
  } else if (automaticBack) {
    return (
      <Link
        to={getAutomaticBackPath()}
        onClick={onLinkClick}
      >
        {content}
      </Link>
    );
  } else {
    return content;
  }
}
