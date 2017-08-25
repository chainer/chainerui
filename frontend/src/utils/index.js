const line2key = (line) => `${line.resultId}_${line.logKey}`;

const line2dataKey = (line, axisName) => `${axisName}_${line2key(line)}`;

const truncate = (string, options = {}) => {
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

const displayName = (result = {}) => (
  truncate(result.name) || truncate(result.pathName, { forward: true })
);

const line2name = (line, result = {}) => `${displayName(result)}/${line.logKey}`;


export {
  line2key,
  line2name,
  line2dataKey,
  displayName,
  truncate
};

