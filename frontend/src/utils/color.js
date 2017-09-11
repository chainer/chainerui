export const rgbFromHSV = ({ h, s, v }) => {
  let r = 0;
  let g = 0;
  let b = 0;
  const i = Math.floor(h * 6);
  const f = (h * 6) - i;
  const p = v * (1 - s);
  const q = v * (1 - (f * s));
  const t = v * (1 - ((1 - f) * s));
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

export const hexFromRGB = ({ r, g, b }) => (
  `#${((2 ** 24) + (r * (2 ** 16)) + (g * (2 ** 8)) + b).toString(16).slice(1)}`
);

export const lineColorGenerator = (resultId, logKey, results = {}, logKeys = []) => {
  const resultIds = Object.keys(results).sort().map(Number);
  const resultIdx = resultIds.indexOf(resultId);
  const logKeyIdx = logKeys.indexOf(logKey);
  const hsv = {
    h: resultIdx / Math.max(1, resultIds.length),
    s: 0.75,
    v: ((logKeyIdx / Math.max(1, logKeys.length)) * 0.5) + 0.5
  };
  return hexFromRGB(rgbFromHSV(hsv));
};

