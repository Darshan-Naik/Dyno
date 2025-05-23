/**
 * Checks if the application is running in Electron environment
 * @returns {boolean} true if running in Electron, false otherwise
 */
export const isElectron = (): boolean => {
  return window.electron !== undefined;
};
