import { useState } from 'react';
import { canvasHeight, canvasWidth, getCoordinates, Position } from './CanvasUtils';

export function useSpray() {
  const [position, setPosition] = useState<Position | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [density, setDensity] = useState<any>(50);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startDraw = (canvasRef, event) => {
    const coordinates = getCoordinates(canvasRef, event);
    setIsDrawing(true);
    const ctx = canvasRef.getContext('2d');
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(coordinates.x, coordinates.y);
  };

  const draw = (canvasRef, event) => {
    if (isDrawing) {
      const newCoordinates = getCoordinates(canvasRef, event);
      for (let i = density; i--; ) {
        const ctx = canvasRef.getContext('2d');
        const radius = 20;
        const offsetX = getRandomInt(-radius, radius);
        const offsetY = getRandomInt(-radius, radius);
        ctx.fillRect(newCoordinates.x + offsetX, newCoordinates.y + offsetY, 1, 1);
      }
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
