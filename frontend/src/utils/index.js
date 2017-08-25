class Utils {
  static line2key(line) {
    return `${line.resultId}_${line.logKey}`;
  }

  static line2name(line, result = {}) {
    return `${Utils.displayName(result)}/${line.logKey}`;
  }

  static line2dataKey(line, axisName) {
    return `${axisName}_${Utils.line2key(line)}`;
  }

  static displayName(result = {}) {
    return Utils.truncate(result.name) || Utils.truncate(result.pathName, { forward: true });
  }

  static truncate(string, options = {}) {
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
  }
}

export default Utils;

