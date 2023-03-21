import React from 'react';
import Nav from 'components/Nav';

export default function HomeScreen () {
  return (
    <React.Fragment>
      <Nav className='text-white justify-center'>
        <span className='font-semibold'>Apps</span>
      </Nav>
      <div className='flex flex-row snap-x snap-mandatory overflow-x-auto'>
        <div className='snap-start shrink-0 h-[100vh] w-[100vw] bg-red-500' />
        <div className='snap-start shrink-0 h-[100vh] w-[100vw] bg-green-500' />
        <div className='snap-start shrink-0 h-[100vh] w-[100vw] bg-blue-500' />
      </div>
    </React.Fragment>
  );
}
