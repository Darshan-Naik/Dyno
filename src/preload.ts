// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getClipboardText: () => ipcRenderer.invoke("get-clipboard-text"),
  setClipboardText: (args) => ipcRenderer.invoke("set-clipboard-text", args),
  ipcRenderer: ipcRenderer,
});
