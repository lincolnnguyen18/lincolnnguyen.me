import React from 'react';

export function TempScreen1 () {
  // generate array of 100 random numbers
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));

  return (
    <>
      <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
        <nav className="h-11 w-screen fixed top-0 z-10 bg-green-custom" />
        <div className="flex flex-col space-y-3 items-center overflow-y-scroll h-screen pt-11 pb-44">
          {arr.map((num, i) => (
            <div key={i} className="">{num}</div>
          ))}
        </div>
      </div>
      <nav className="h-11 w-screen fixed bottom-0 z-10 bg-green-custom" />
    </>
  );
}
