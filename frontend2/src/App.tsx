import Debug from 'apps/home/Debug';
import InitialLoad from 'apps/home/InitialLoad';
import React from 'react';

function App () {
  return (
    <React.Fragment>
      <div className="flex flex-col">
        {/* <span>Hello</span> */}
        {Array(100).fill(0).map((_, i) => <span key={i}>Hello</span>)}
      </div>
      <InitialLoad />
      <Debug />
    </React.Fragment>
  );
}

export default App;
