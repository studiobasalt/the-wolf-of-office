const {
    BrowserView,
    BrowserWindow,
    app,
    screen
} = require('electron')


function twoViews() {
    const win = new BrowserWindow({
        simpleFullscreen: false,
        fullscreen: true,
        show: false,
        skipTaskbar: true,
        resizable: false,
        useContentSize: true,
        kiosk: true,
    })

    setTimeout(function () {

        var mainScreen = screen.getPrimaryDisplay();
        var dimensions = mainScreen.size;

        const view = new BrowserView()
        const width = dimensions.width
        const height = dimensions.height
        win.addBrowserView(view)
        view.setBounds({
            x: 0,
            y: 0,
            width: width,
            height: height
        })
        view.setAutoResize({
            width: true,
            height: true
        });
        view.webContents.loadURL('https://stats.uptimerobot.com/JNXGPFB01o')


        // const secondView = new BrowserView()
        // win.addBrowserView(secondView)
        // secondView.setBounds({
        //     x: 0,
        //     y: Math.round(height/2),
        //     width: width,
        //     height: Math.round(height/2)
        // })
        // secondView.setAutoResize({
        //     width: true,
        //     height: true
        // });
        // secondView.webContents.loadURL('https://electronjs.org')
        // app.on('window-all-closed', () => {
        //     win.removeBrowserView(secondView)
        //     win.removeBrowserView(view)
        //     app.quit()
        // })

    }, 10);

}

app.whenReady().then(twoViews)
