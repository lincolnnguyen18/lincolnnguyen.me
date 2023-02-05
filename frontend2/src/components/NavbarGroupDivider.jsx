import React from 'react';

export function NavbarGroupDivider ({ type = 'vert', ...rest }) {
  if (type === 'vert') {
    return (
      <div className="h-[1px] bg-black bg-opacity-30" {...rest} />
    );
  } else {
    return (
      <div className="w-[1px] bg-black bg-opacity-30" {...rest} />
    );
  }
}
