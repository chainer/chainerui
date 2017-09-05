export * from './polling';

export const line2key = (line) => `${line.resultId}_${line.logKey}`;

export const line2dataKey = (line, axisName) => `${axisName}_${line2key(line)}`;

export const truncate = (string, options = {}) => {
  const { length = 20, restStr = '...', forward = false } = options;
  let str = string || '';
  const chars = [...str];
  if (chars.length > length) {
    if (forward) {
      str = restStr + chars.slice(chars.length - length).join('');
    } else {
      str = chars.slice(0, length).join('') + restStr;
    }
  }
  return str;
};

export const displayName = (result = {}) => (
  truncate(result.name) || truncate(result.pathName, { forward: true })
);

export const line2name = (line, result = {}) => `${displayName(result)}/${line.logKey}`;

