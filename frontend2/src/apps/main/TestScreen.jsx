import React from 'react';

export function TestScreen () {
  // return (
  //   <>
  //     <div className="flex flex-col gap-4">
  //       {Array.from({ length: 10 }).map((_, i) => (
  //         <span key="i">{i}</span>
  //       ))}
  //     </div>
  //     <h1 className="sticky bg-red-100 top-0">Hello</h1>
  //     <div className="flex flex-col gap-4">
  //       {Array.from({ length: 100 }).map((_, i) => (
  //         <span key="i">{i}</span>
  //       ))}
  //     </div>
  //   </>
  // );

  return (
    <div className="h-[700px] bg-red-100 overflow-y-scroll">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key="i">{i}</span>
        ))}
      </div>
      <h1 className="sticky bg-red-100 top-0">Hello</h1>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 100 }).map((_, i) => (
          <span key="i">{i}</span>
        ))}
      </div>
    </div>
  );
}
