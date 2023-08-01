const {BrowserWindow, session} = require('electron');

module.exports = new BrowserWindow({
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
    },
    // allow mouse events to pass through window
    transparent: true,
    // kiosk: true,
    // set UA 
    // userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko)',
})