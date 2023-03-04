import React from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from '../slices/commonSlice';
import { Blackbox } from './BlackBox';

export function Errors () {
  const { errors } = useSelector(commonSelector);

  if (errors.length > 1) {
    return (
      <Blackbox>
        <div className="font-semibold font-semibold sm:text-lg text-base mb-1">Error</div>
        <ul className="list-inside list-disc">
          {errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
      </Blackbox>
    );
  } else if (errors.length === 1) {
    return (
      <Blackbox>
        <div className="font-semibold font-semibold sm:text-lg text-base mb-1">Error</div>
        <div>{errors[0]}</div>
      </Blackbox>
    );
  }
}
