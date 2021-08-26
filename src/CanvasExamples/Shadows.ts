import { useState } from 'react';
import { drawShadedLine, getCoordinates, Position } from './CanvasUtils';

export function useShadows() {
  const [canDraw, setCanDraw] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);

  const startDraw = (canvasRef, event) => {
    const coordinates = getCoordinates(canvasRef, event);
    if (coordinates && coordinates.x && coordinates.y) {
      const newX = coordinates.x + 0.1;
      const newY = coordinates.y + 0.1;
      // secondPoint hack, because you can't use drawLine with just 1 point
      const newCoordinates = { x: newX, y: newY };
      setCanDraw(true);
      setPosition(coordinates);
      drawShadedLine(canvasRef, coordinates, newCoordinates, null, null);
    }
  };

  const draw = (canvasRef, event) => {
    if (canDraw) {
      const newCoordinates = getCoordinates(canvasRef, event);
      if (position && newCoordinates) {
        drawShadedLine(canvasRef, position, newCoordinates, null, null);
        setPosition(newCoordinates);
      }
    }
  };

  const exitDraw = () => {
    setCanDraw(false);
  };

  return {
    draw,
    exitDraw,
    startDraw
  };
}
