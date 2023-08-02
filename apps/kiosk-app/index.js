require('dotenv').config();
const { app } = require('electron');
const serve = require('electron-serve');

let mainWindow;

function init() {
    mainWindow = require('./lib/browserWindow.js');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.loadURL(process.env.KIOSK_URL);
}

app.on('ready', init);

app.on('activate', () => {
    if (mainWindow === null) {
        init();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

