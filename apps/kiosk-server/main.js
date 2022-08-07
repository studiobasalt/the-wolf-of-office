const {app} = require('electron')

app.name = 'Kiosk - Wolf of Office'
app.whenReady().then(() => {
    const data = require('./data.js')
    const win = require('./windows.js')
    win.init(data)
})