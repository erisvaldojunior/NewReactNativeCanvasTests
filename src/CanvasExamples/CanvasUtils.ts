export const canvasHeight = 400;
export const canvasWidth = 400;

export interface Position {
  x?: number;
  y?: number;
}

export const getCoordinates = (canvas, event) => {
  if (!canvas || !event) {
    return {};
  }
  const rect = {left: 0, top: 0};

  let positionX;
  let positionY;

  // First check if it is a touch event.
  // Tricky because GCanvas uses event.nativeEvent object,
  // while web canvas uses event.changedTouches (array, position 0).
  if (event.changedTouches) {
    console.log('#1');
    // Web Canvas touch
    positionX = event.changedTouches[0]?.pageX;
    positionY = event.changedTouches[0]?.pageY;
  } else if (event.nativeEvent?.pageX && event.nativeEvent?.pageY) {
    // Either Mobile GCanvas touch or Web Canvas mouse click
    positionX = event.nativeEvent?.locationX;
    positionY = event.nativeEvent?.locationY;
  } else {
    // Shouldn't happen (being super safe to catch a web Canvas mouse click)
    console.log('#3');
    positionX = event.pageX;
    positionY = event.pageY;
  }

  return {
    x: positionX - rect.left,
    y: positionY - rect.top,
  };
};

export const drawLine = (
  canvas,
  originalPosition,
  newPosition,
  color,
  size,
) => {
  if (!canvas) {
    return;
  }
  const context = canvas.getContext('2d');

  console.log('context');

  console.log(context);

  if (context) {
    context.strokeStyle = color || '#FF0000';
    context.lineJoin = 'round';
    context.lineWidth = size || 30;
    context.beginPath();
    context.moveTo(originalPosition.x, originalPosition.y);
    context.lineTo(newPosition.x, newPosition.y);
    context.closePath();
    context.stroke();
  }
};

export const drawShadedLine = (
  canvas,
  originalPosition,
  newPosition,
  color,
  size,
) => {
  if (!canvas) {
    return;
  }
  const context = canvas.getContext('2d');
  if (context) {
    context.strokeStyle = color || '#FF0000';
    context.shadowBlur = size || 10;
    context.shadowColor = 'rgb(0,0,0)';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = size || 5;
    context.beginPath();
    context.moveTo(originalPosition.x, originalPosition.y);
    context.lineTo(newPosition.x, newPosition.y);
    context.closePath();
    context.stroke();
  }
};
