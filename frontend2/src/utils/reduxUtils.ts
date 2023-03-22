import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'common/store';

async function fetchPayload<T> (dispatch: AppDispatch, action: AsyncThunkAction<T, any, any>): Promise<T> {
  const result = await dispatch(action);
  return result.payload as T;
}

export { fetchPayload };
