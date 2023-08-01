require('dotenv').config();
const dataStore = require('./lib/dataStore.js');
const { app, session, BrowserView } = require('electron');


let mainWindow;

function init(){
    mainWindow = require('./lib/mainWindow.js');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    dataStore.subscribe((data) => {
        // console.log(data);
        const SlideFactory = require('./lib/slideFactory.js');
        const slide1 = new SlideFactory(data.views[0]);
    });
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

