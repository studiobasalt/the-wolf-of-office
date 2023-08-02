const { BrowserWindow } = require('electron');

const window = new BrowserWindow({
    fullscreen: true,
    show: true,
    skipTaskbar: true,
    resizable: false,
    useContentSize: true,
    backgroundColor: '#502FE9',
    hasShadow: false,
    alwaysOnTop: true,
    title: 'Kiosk Player',
    frame: false,
    movable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
        contextIsolation: false,
        spellcheck: false,
        enableWebSQL: false,
        webSecurity: false,
        allowRunningInsecureContent: true,
        webviewTag: true,
    },
    transparent: false,
    kiosk: true,
});

module.exports = window;