const { app } = require('electron');
require('dotenv').config();
require('./lib/firebase');

// This method will be called when Electron has finished initialization
app.on('ready', () => {
  require('./lib/ui-window');
});
