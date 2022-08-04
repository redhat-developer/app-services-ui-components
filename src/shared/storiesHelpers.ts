export const log: typeof console.log = (...args) => {
  // don't log under Jest
  if (process.env.JEST_WORKER_ID) return;
  console.log(...args);
};

export function fakeApi<T>(response: T, waitLengthMs = 500): Promise<T> {
  log("%cfakeApi", "color: green", { response, waitLengthMs });
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      process.env.JEST_WORKER_ID !== undefined &&
        log("%cfakeApi: resolve", "color: green", {
          response,
          waitLengthMs,
        });
      resolve(response);
    }, waitLengthMs);
    return () => clearTimeout(timeout);
  });
}

export function apiError<T>(response?: T, waitLengthMs = 500): Promise<T> {
  process.env.JEST_WORKER_ID !== undefined &&
    log("%capiError", "color: green", { response, waitLengthMs });
  return new Promise((_, reject) => {
    const timeout = setTimeout(() => {
      log("%capiError: reject", "color: green", {
        response,
        waitLengthMs,
      });
      reject(response);
    }, waitLengthMs);
    return () => clearTimeout(timeout);
  });
}
