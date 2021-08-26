import { useState } from 'react';
import { canvasHeight, canvasWidth, getCoordinates, Position } from './CanvasUtils';

export function useSimplePattern() {
  const [isDrawing, setIsDrawing] = useState(false);

  const midPointBtw = (p1, p2) => {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2
    };
  };
}
