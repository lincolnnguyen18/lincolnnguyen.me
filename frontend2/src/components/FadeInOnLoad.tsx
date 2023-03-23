import React, { useState, useEffect } from 'react';

function FadeInOnLoad (props: React.HTMLAttributes<HTMLDivElement>) {
  const { children } = props;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div
      className='transition-opacity duration-200'
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {children}
    </div>
  );
};

export default FadeInOnLoad;
