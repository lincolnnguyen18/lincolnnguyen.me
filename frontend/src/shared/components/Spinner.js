import React from 'react';
import { Ring, Layer, Stage, Arc } from 'react-konva';

export function Spinner ({ size = '0.8rem', color = 'red', className = '' }) {
  const defaultFontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
  const sizeInPixels = parseFloat(size) * defaultFontSize;

  return (
    <Stage width={sizeInPixels * 2} height={sizeInPixels * 2} className={className + 'animate-spin'}>
      <Layer>
        <Ring
          x={sizeInPixels}
          y={sizeInPixels}
          innerRadius={sizeInPixels / 1.6}
          outerRadius={sizeInPixels}
          fill={color}
          opacity="0.5"
        />
        <Arc
          x={sizeInPixels}
          y={sizeInPixels}
          innerRadius={sizeInPixels / 1.6}
          outerRadius={sizeInPixels}
          fill={color}
          angle={120}
        />
      </Layer>
    </Stage>
  );
}
