import { v4 } from 'uuid';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'common/store';

function enableCallbackIfTrue (condition: boolean, callback: () => void) {
  return condition ? callback : undefined;
}

async function wait (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uuid () {
  return v4();
}

async function fetchPayload<T> (dispatch: AppDispatch, action: AsyncThunkAction<T, any, any>): Promise<T> {
  const result = await dispatch(action);
  return result.payload as T;
}

function getScrollPositionFromBottom () {
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;
  const distanceFromBottom = documentHeight - (scrollPosition + viewportHeight);
  return distanceFromBottom;
}

export {
  enableCallbackIfTrue,
  wait,
  uuid,
  fetchPayload,
  getScrollPositionFromBottom,
};
