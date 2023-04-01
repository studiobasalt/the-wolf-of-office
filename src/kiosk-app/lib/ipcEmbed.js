const { contextBridge, ipcRenderer } = require('electron');
const globals = require('./globals');

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer,
  onUserLoginStatus: (callback) => ipcRenderer.on(globals.events.updateUserLoginState, callback),
  initAuth: () => ipcRenderer.send(globals.events.initAuth),
  log: (message) => ipcRenderer.send(globals.events.log, message)
});
