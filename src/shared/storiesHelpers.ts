export function fakeApi<T>(response: T, waitLengthMs = 500): Promise<T> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(response), waitLengthMs);
    return () => clearTimeout(timeout);
  });
}

export function apiError() {
  return Promise.reject();
}
