export const startPolling = (func, pollingRate) => {
  func();
  if (pollingRate <= 0) {
    return null;
  }
  return setInterval(func, pollingRate);
};

export const stopPolling = (timer) => {
  clearInterval(timer);
};

