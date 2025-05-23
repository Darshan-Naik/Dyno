import { app, BrowserWindow, ipcMain, clipboard } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const APP_URL = "https://dyno-rho.vercel.app";

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    trafficLightPosition: { x: 16, y: 9 },
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    darkTheme: true,
    icon: "./assets/icons/icon.png",
    backgroundColor: "#181818",
  });

  // Load the app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadURL(APP_URL);
    // mainWindow.loadFile(
    //   path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    // );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.setAboutPanelOptions({
  copyright: "© 2024. All Rights Reserved",
  authors: ["Darshan Naik"],
  credits: "Darshan Naik",
});

ipcMain.handle("get-clipboard-text", () => {
  return clipboard.readText();
});

ipcMain.handle("set-clipboard-text", (_, text: string) => {
  return clipboard.writeText(text);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
