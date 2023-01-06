import React from 'react';

export function TempScreen1 () {
  // generate array of 100 random numbers
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));

  return (
    <>
      <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
        <nav className="h-11 w-screen sticky top-0 z-10 bg-green-custom" />
        <div className="flex flex-col space-y-3 items-center overflow-y-scroll absolute top-11 bottom-11 left-0 right-0">
          {arr.map((num, i) => (
            <div key={i} className="">{num}</div>
          ))}
        </div>
      </div>
      <nav className="h-11 w-screen absolute bottom-0 z-10 bg-green-custom" />
    </>
  );
}
