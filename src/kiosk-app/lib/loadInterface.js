const { BrowserWindow, app } = require('electron');
const process = require('process');
const path = require('path');
const serve = require('electron-serve');

require('./ipcEvents');

let mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true,
    preload: path.join(__dirname, 'ipcEmbed.js')
  }
});

// Load the index.html file
mainWindow.loadFile('./screens/login/index.html');

// Server from dev url or serve builed files
if (!app.isPackaged) {
  mainWindow.loadURL(process.env.KIOSK_DEV_URL);
} else {
  const loadURL = serve({ directory: 'build/kiosk-ui' });
  loadURL(mainWindow);
}

// Open the DevTools in development mode
if (process.env.NODE_ENV === 'development') {
  // mainWindow.webContents.openDevTools();
}
