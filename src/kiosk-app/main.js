const { app } = require('electron');
require('dotenv').config();

// This method will be called when Electron has finished initialization
app.on('ready', () => {
  require('./lib/ui-window');
});
