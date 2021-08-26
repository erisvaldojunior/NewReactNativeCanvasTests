import { useState } from 'react';
import { getCoordinates } from './CanvasUtils';

export function useFur() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<any>([]);

  const startDraw = (canvasRef, event) => {
    const coordinates = getCoordinates(canvasRef, event);
    setPoints([]);
    setIsDrawing(true);
    setPoints((currentPoints) => [...currentPoints, { x: coordinates.x, y: coordinates.y }]);
  };

  const draw = (canvasRef, event) => {
    if (isDrawing) {
      const ctx = canvasRef.getContext('2d');
      const coordinates = getCoordinates(canvasRef, event);

      //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      setPoints((currentPoints) => [...currentPoints, { x: coordinates.x, y: coordinates.y }]);

      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      ctx.beginPath();
      if (p1) {
        ctx.moveTo(p1.x, p1.y);
      }
      if (p2) {
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      for (let i = 0, len = points.length; i < len; i++) {
        const dx = points[i].x - points[points.length - 1].x;
        const dy = points[i].y - points[points.length - 1].y;
        const d = dx * dx + dy * dy;

        if (d < 2000 && Math.random() > d / 2000) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0,0,0,0.3)';
          ctx.moveTo(
            points[points.length - 1].x + dx * 0.5,
            points[points.length - 1].y + dy * 0.5
          );
          ctx.lineTo(
            points[points.length - 1].x - dx * 0.5,
            points[points.length - 1].y - dy * 0.5
          );
          ctx.stroke();
        }
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
