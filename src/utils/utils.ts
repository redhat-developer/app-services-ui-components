export const getModalAppendTo = (): HTMLElement =>
  (document.getElementById('chrome-app-render-root') as HTMLElement) ||
  document.body;