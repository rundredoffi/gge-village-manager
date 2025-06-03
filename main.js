const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
  });
  win.setMenuBarVisibility(false);
  win.setResizable(false);
  win.setTitle("GGE Villages");
  win.loadFile("renderer/index.html");
}

app.whenReady().then(() => {
  createWindow();
});
