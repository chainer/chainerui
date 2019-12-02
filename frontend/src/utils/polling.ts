export const startPolling = (
  func: (...args: any[]) => any,
  pollingRate: number,
  ...args: Parameters<typeof func>
): ReturnType<typeof setInterval> | null => {
  func(...args);
  if (pollingRate <= 0) {
    return null;
  }
  return setInterval(() => {
    func(...args);
  }, pollingRate);
};

export const stopPolling = (timer: ReturnType<typeof setInterval> | null): void => {
  if (timer != null) {
    clearInterval(timer);
  }
};
