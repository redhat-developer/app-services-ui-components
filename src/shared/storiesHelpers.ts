export function fakeApi<T>(response: T, waitLengthMs = 500): Promise<T> {
  console.log("%cfakeApi", "color: green", { response, waitLengthMs });
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.log("%cfakeApi: resolve", "color: green", {
        response,
        waitLengthMs,
      });
      resolve(response);
    }, waitLengthMs);
    return () => clearTimeout(timeout);
  });
}

export function apiError<T>(response?: T, waitLengthMs = 500): Promise<T> {
  console.log("%capiError", "color: green", { response, waitLengthMs });
  return new Promise((_, reject) => {
    const timeout = setTimeout(() => {
      console.log("%capiError: reject", "color: green", {
        response,
        waitLengthMs,
      });
      reject(response);
    }, waitLengthMs);
    return () => clearTimeout(timeout);
  });
}
