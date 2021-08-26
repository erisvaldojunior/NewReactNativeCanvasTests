import {useState} from 'react';
import {
  canvasHeight,
  canvasWidth,
  getCoordinates,
  Position,
} from './CanvasUtils';

export function useShapes() {
  const [position, setPosition] = useState<Position | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<any>([]);
  const [radius, setRadius] = useState(15);

  const drawStar = (canvasRef, x, y) => {
    const length = 15;
    const ctx = canvasRef.getContext('2d');
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.rotate((Math.PI * 1) / 10);
    for (let i = 5; i--; ) {
      ctx.lineTo(0, length);
      ctx.translate(0, length);
      ctx.rotate((Math.PI * 2) / 10);
      ctx.lineTo(0, -length);
      ctx.translate(0, -length);
      ctx.rotate(-((Math.PI * 6) / 10));
    }
    ctx.lineTo(0, length);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startDraw = (canvasRef, event) => {
    const coordinates = getCoordinates(canvasRef, event);
    setIsDrawing(true);
    setPoints(points => [...points, {x: coordinates.x, y: coordinates.y}]);
  };

  const draw = (canvasRef, event) => {
    if (isDrawing) {
      const newCoordinates = getCoordinates(canvasRef, event);

      setPoints(points => [
        ...points,
        {x: newCoordinates.x, y: newCoordinates.y},
      ]);

      const ctx = canvasRef.getContext('2d');
      //      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < points.length; i++) {
        drawStar(canvasRef, points[i].x, points[i].y);
      }
      /*
      if (position && newCoordinates) {
        drawShadedLine(canvasRef, position, newCoordinates, null, null);
        setPosition(newCoordinates);
      }
      */
    }
  };

  const exitDraw = () => {
    setIsDrawing(false);
    points.length = 0;
  };

  return {
    draw,
    exitDraw,
    startDraw,
  };
}
