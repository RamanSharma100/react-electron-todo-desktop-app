const path = require("path");

const { app, BrowserWindow, Menu } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Todo Desktop App",
    webPreferences: {
      NodeIntegration: true,
    },
  });

  // load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}
const menu = Menu.buildFromTemplate([
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        role: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Control+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
]);

Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
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
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (require("electron-squirrel-startup")) {
  app.quit();
}