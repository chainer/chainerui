export const startPolling = (func, pollingRate, ...args) => {
  func(...args);
  if (pollingRate <= 0) {
    return null;
  }
  return setInterval(() => { func(...args); }, pollingRate);
};

export const stopPolling = (timer) => {
  clearInterval(timer);
};

