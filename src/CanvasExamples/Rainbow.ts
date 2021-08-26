import { useState } from 'react';
import { getCoordinates } from './CanvasUtils';

export function useRainbow() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [hue, setHue] = useState<any>([]);
  const [lastX, setLastX] = useState<any>(null);
  const [lastY, setLastY] = useState<any>(null);

  function hslToRgb(h, s, l) {
    //convert h, s, and l back to the 0-1 range
    //convert the hue's 360 degrees in a circle to 1
    h /= 360;
    //convert the saturation and lightness to the 0-1
    //range by multiplying by 100
    s /= 100;
    l /= 100;
    let r;
    let g;
    let b;
    if (s === 0) {
      r = l;
      g = l;
      b = l;
    } else {
      const hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  const startDraw = (canvasRef, event) => {
    const coordinates = getCoordinates(canvasRef, event);
    setIsDrawing(true);
    setLastX(coordinates.x);
    setLastY(coordinates.y);
  };

  const draw = (canvasRef, event) => {
    if (isDrawing) {
      const ctx = canvasRef.getContext('2d');
      const coordinates = getCoordinates(canvasRef, event);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 33;
      const rgb = hslToRgb(hue, 100, 50);
      ctx.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(coordinates.x, coordinates.y);
      ctx.stroke();
      setHue(hue + 1);
      if (hue >= 360) {
        setHue(1);
      }
      setLastX(coordinates.x);
      setLastY(coordinates.y);
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
