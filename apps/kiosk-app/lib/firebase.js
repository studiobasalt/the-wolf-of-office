const { initializeApp } = require('firebase/app');
const { initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const ElectronPersistence = require('./authStorage.js');
const ipcMain = require('electron').ipcMain;
const globals = require('./globals.js');
let ipcMainEvent = null;

// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyAoaQv657JWPnOCJ3kCVxLJyH_DiOeK3RE',
  authDomain: 'wolf-of-office.firebaseapp.com',
  projectId: 'wolf-of-office',
  storageBucket: 'wolf-of-office.appspot.com',
  messagingSenderId: '894620490761',
  appId: '1:894620490761:web:8a650bf634898111e5ecd8'
});
const auth = initializeAuth(app, {
  persistence: ElectronPersistence
});

// Event listener for user login state change
auth.onAuthStateChanged((user) => {
  ipcMainEvent?.reply(globals.events.updateUserLoginState, user ? true : false);
});

// Trigger to init the login state
ipcMain.on(globals.events.initAuth, (event) => {
  event.reply(globals.events.updateUserLoginState, auth.currentUser ? true : false);
  ipcMainEvent = event;
});

// Handle user registration
ipcMain.on(globals.events.register, (event, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Handle successful registration
      const user = userCredential.user;
      ipcMainEvent?.reply(globals.events.updateUserLoginState, user ? true : false);
    })
    .catch((error) => {
      // Handle registration error
      event.reply(globals.events.authError, error.message);
      throw error;
    });
});

// Handle user login
ipcMain.on(globals.events.login, (event, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Handle successful login
      const user = userCredential.user;
      ipcMainEvent?.reply(globals.events.updateUserLoginState, user ? true : false);
    })
    .catch((error) => {
      // Handle login error
      event.reply(globals.events.authError, error.message);
      throw error;
    });
});

// Handle user logout
ipcMain.on(globals.events.logout, (event) => {
  auth.signOut();
});

module.exports = {
  app,
  auth
};
