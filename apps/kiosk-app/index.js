const { app } = require('electron');
const url = require('./env');

app.commandLine.appendSwitch('ignore-gpu-blacklist')
app.commandLine.appendSwitch('enable-gpu-rasterization')
app.commandLine.appendSwitch('enable-accelerated-video')
app.commandLine.appendSwitch('enable-accelerated-video-decode')
app.commandLine.appendSwitch('use-gl', 'desktop')
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder')

let mainWindow;

function init() {
    mainWindow = require('./lib/browserWindow.js');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.loadURL(url);
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

