class Utils {
  static line2key(line) {
    return `${line.resultId}_${line.logKey}`;
  }

  static line2dataKey(line, axisName) {
    return `${axisName}_${Utils.line2key(line)}`;
  }

  static truncateForward(string, length, beginning = '...') {
    const str = string || '';
    if (str.length > length) {
      return beginning + str.substring((str.length - length) + beginning.length, str.length);
    }
    return str;
  }
}

export default Utils;

