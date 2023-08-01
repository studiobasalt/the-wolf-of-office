const { BrowserWindow, session } = require('electron');

const window = new BrowserWindow({
    // fullscreen: true,
    // show: true,
    skipTaskbar: true,
    // resizable: false,
    useContentSize: true,
    backgroundColor: '#502FE9',
    hasShadow: false,
    // alwaysOnTop: true,
    title: 'Kiosk Player',
    // frame: false,
    // movable: false,
    // titleBarStyle: 'hidden',
    webPreferences: {
        contextIsolation: false,
        spellcheck: false,
        enableWebSQL: false,
        webSecurity: false,
        allowRunningInsecureContent: true,

        // disable sameorigin
        webviewTag: true,
    },
    // allow mouse events to pass through window
    transparent: true,
    // kiosk: true,
});

module.exports = window;