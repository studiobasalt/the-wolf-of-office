const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const ipcMain = require('electron').ipcMain;
const globals = require('./globals.js');
const Store = require('electron-store');
const store = new Store();
let ipcMainEvent = null;

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAoaQv657JWPnOCJ3kCVxLJyH_DiOeK3RE',
  authDomain: 'wolf-of-office.firebaseapp.com',
  projectId: 'wolf-of-office',
  storageBucket: 'wolf-of-office.appspot.com',
  messagingSenderId: '894620490761',
  appId: '1:894620490761:web:8a650bf634898111e5ecd8'
};

const app = initializeApp(config);
const auth = getAuth();

// Store login token in safeStorage
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken().then((token) => {
      store.set('refresh-token', token);
    });
  }
  ipcMainEvent?.reply(globals.events.updateUserLoginState, user ? true : false);
});

// Log back in if token is present
const token = store.get('refresh-token');
if (token) {
  auth.signInWithCustomToken(token);
}

// Trigger to init the login state
ipcMain.on(globals.events.initAuth, (event) => {
  event.reply(globals.events.updateUserLoginState, auth.currentUser ? true : false);
  ipcMainEvent = event;
});

module.exports = {
  app,
  auth
};
