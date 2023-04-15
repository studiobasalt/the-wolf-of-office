const { contextBridge, ipcRenderer } = require('electron');
const globals = require('./globals');

contextBridge.exposeInMainWorld('electronAPI', {
  onUserLoginStatusChange: (callback) => ipcRenderer.on(globals.events.updateUserLoginState, callback),
  initAuth: () => ipcRenderer.send(globals.events.initAuth),
  log: (message) => ipcRenderer.send(globals.events.log, message),
  regsiterUser: (email, password) => ipcRenderer.send(globals.events.register, email, password),
  loginUser: (email, password) => ipcRenderer.send(globals.events.login, email, password),
  onAuthError: (callback) => ipcRenderer.on(globals.events.authError, callback),
  logoutUser: () => ipcRenderer.send(globals.events.logout),
  startKiosk: () => ipcRenderer.send(globals.events.startKiosk)
});
