export const startResultsPolling = (func, pollingRate) => {
  func();
  if (pollingRate <= 0) {
    return null;
  }
  return setInterval(func, pollingRate);
};

export const stopResultsPolling = (timer) => {
  clearInterval(timer);
};

