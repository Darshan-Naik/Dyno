export interface IElectron {
  getClipboardText: () => Promise<string>;
  setClipboardText: (args: string) => Promise<void>;
}

declare global {
  interface Window {
    electron: IElectron;
  }
}
