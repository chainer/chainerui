class Utils {
  static line2key(line) {
    return `${line.resultId}_${line.logKey}`;
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

