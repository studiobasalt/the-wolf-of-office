const { ipcMain } = require('electron');

ipcMain.on('test', (event) => {
  console.log('test');
  event.reply('test-reply', 'pong');
});

// // Handle user registration
// ipcMain.on('register', (event, email, password) => {
//   console.log('register');
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Handle successful registration
//       const user = userCredential.user;
//       console.log(user);
//       mainWindow.webContents.send('registration-successful', user);
//     })
//     .catch((error) => {
//       // Handle registration error
//       mainWindow.webContents.send('registration-error', error);
//     });
// });

// // Handle user login
// ipcMain.on('login', (event, email, password) => {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Handle successful login
//       const user = userCredential.user;
//       mainWindow.webContents.send('login-successful', user);
//     })
//     .catch((error) => {
//       // Handle login error
//       mainWindow.webContents.send('login-error', error);
//     });
// });
