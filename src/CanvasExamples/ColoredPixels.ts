import { useState } from 'react';
import { getCoordinates } from './CanvasUtils';

export function useColoredPixels() {
  const [isDrawing, setIsDrawing] = useState(false);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const drawPixels = (canvasRef, x, y) => {
    const ctx = canvasRef.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = -10; i < 10; i += 4) {
      for (let j = -10; j < 10; j += 4) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = ['red', 'orange', 'yellow', 'green', 'light-blue', 'blue', 'purple'][
            getRandomInt(0, 6)
          ];
          ctx.fillRect(x + i, y + j, 4, 4);
        }
      }
    }
  };

  const startDraw = (canvasRef, event) => {
    const coordinates = getCoordinates(canvasRef, event);
    setIsDrawing(true);
  };

  const draw = (canvasRef, event) => {
    if (isDrawing) {
      const coordinates = getCoordinates(canvasRef, event);
      drawPixels(canvasRef, coordinates.x, coordinates.y);
    }
  };

  const exitDraw = () => {
    setIsDrawing(false);
  };

  return {
    draw,
    exitDraw,
    startDraw
  };
}
