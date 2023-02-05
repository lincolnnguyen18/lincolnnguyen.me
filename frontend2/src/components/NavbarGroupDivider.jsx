import React from 'react';

export function NavbarGroupDivider ({ dir = 'vert', ...rest }) {
  if (dir === 'vert') {
    return (
      <div className="h-[1px] bg-black bg-opacity-30" {...rest} />
    );
  } else {
    return (
      <div className="w-[1px] bg-black bg-opacity-30" {...rest} />
    );
  }
}
