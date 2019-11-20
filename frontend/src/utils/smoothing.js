/* eslint-disable import/prefer-default-export, no-param-reassign, no-underscore-dangle */

// original: https://github.com/d3/d3-shape/blob/master/src/curve/linear.js
class SmoothedLinearClass {
  constructor(context, smoothingWeight) {
    this._context = context;
    this._smoothingWeight = smoothingWeight;
  }

  areaStart() {
    this._line = 0;
  }

  areaEnd() {
    this._line = NaN;
  }

  lineStart() {
    this._point = 0;
  }

  lineEnd() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  }

  point(x, y) {
    x = +x;
    y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        if (this._line) {
          this._context.lineTo(x, y);
        } else {
          this._context.moveTo(x, y);
        }
        this._lastY = y;
        break;
      case 1:
        this._point = 2;
      // fall through
      default:
        this._lastY = this._lastY * this._smoothingWeight + y * (1 - this._smoothingWeight);
        this._context.lineTo(x, this._lastY);
        break;
    }
  }
}

export const SmoothedLinear = SmoothedLinearClass;
