const { app, BrowserWindow } = require('electron');
const firebase = require('firebase/app');
require('firebase/auth');

// Load environment variablesnode
require('dotenv').config();

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAoaQv657JWPnOCJ3kCVxLJyH_DiOeK3RE",
    authDomain: "wolf-of-office.firebaseapp.com",
    projectId: "wolf-of-office",
    storageBucket: "wolf-of-office.appspot.com",
    messagingSenderId: "894620490761",
    appId: "1:894620490761:web:8a650bf634898111e5ecd8"
});

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load the index.html file
  mainWindow.loadFile('screens/index.html');

  console.log(process.env.NODE_ENV );

  // Open the DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, it is common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle user registration
app.on('register', (event, email, password) => {
    console.log('register');
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Handle successful registration
      const user = userCredential.user;
      console.log(user);
      mainWindow.webContents.send('registration-successful', user);
    })
    .catch((error) => {
      // Handle registration error
      mainWindow.webContents.send('registration-error', error);
    });
});

// Handle user login
app.on('login', (event, email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Handle successful login
      const user = userCredential.user;
      mainWindow.webContents.send('login-successful', user);
    })
    .catch((error) => {
      // Handle login error
      mainWindow.webContents.send('login-error', error);
    });
});