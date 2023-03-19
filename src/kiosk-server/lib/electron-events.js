const { ipcMain } = require('electron');

ipcMain.on('trigger-function', (event, arg) => {
    myFunction();
});
  