const {BrowserWindow, screen, BrowserView} = require('electron');

class Window{
    constructor(){
        this.window = {};
        this.screen = screen.getPrimaryDisplay();
        this.dimensions = this.screen.size;
        this.width = this.dimensions.width;
        this.height = this.dimensions.height;
        this.activeView = 1
        this.views = []
    }

    async init(data){
        this.data = await data;
        this.setupWindow();
        await this.updateViews();
        // this.activateView(this.activeView);
    }

    activateView(id){
        // remove old view from window
        this.views[this.activeView]?.forEach((view) => {
            // this.window.removeBrowserView(view)
        })
        // add new view to window
        this.views[id]?.forEach((view) => {
            this.window.addBrowserView(view)
            console.log('add');
        })
        this.activeView = id
    }

    setupWindow(){
        this.window = new BrowserWindow({
            fullscreen: true,
            show: true,
            skipTaskbar: true,
            resizable: false,
            useContentSize: true,
            backgroundColor: '#502FE9',
            hasShadow: false,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                allowRunningInsecureContent: true,
                allowDisplayingInsecureContent: true
            }
            // kiosk: true,
        })
    }

    async updateViews(){
        this.data = await this.data.update()
        this.data.device.views?.forEach((view, i) => {
            let viewList = []
            view.viewSections.forEach((section) => {
                const view = new BrowserView()
                this.window.addBrowserView(view)
                view.setBounds({
                    x: this.getWidth(section.x),
                    y: this.getHeight(section.y),
                    width: this.getWidth(section.width),
                    height: this.getHeight(section.height)
                })
                view.setAutoResize({
                    width: true,
                    height: true
                });
                view.webContents.loadURL(section.url)
                viewList.push(view)
            })
            this.views[i] = viewList
        })
        // if empty view, fill with empty
        if(this.views.length === 0){
            this.fillWithEmpty()
        }
    }

    fillWithEmpty(){
        const view = new BrowserView()
        this.window.addBrowserView(view)
        view.setBounds({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        })
        view.setAutoResize({
            width: true,
            height: true
        });
        view.webContents.loadFile('./screens/index.html')
        // inject js code to the window
        view.webContents.executeJavaScript(`
            var devicename = '${this.data.device.name}'
        `)
        // when view is ready, inject js code to the window
        view.webContents.on('did-finish-load', () => {
            view.webContents.executeJavaScript(`
                var devicename = '${this.data.device.name}'
                let deviceNameElm = document.getElementById('devicename');
                deviceNameElm.innerHTML = devicename;
            `)
        })
    }

    getWidth(width){
        return this.width / 100 * width
    }

    getHeight(height){
        return this.height / 100 * height
    }

    insertTransitionOut(view){
    }

    insertTransitionIn(view){
    }
}

module.exports = new Window();

// function twoViews() {
//     const win = new BrowserWindow({
//         simpleFullscreen: false,
//         fullscreen: true,
//         show: false,
//         skipTaskbar: true,
//         resizable: false,
//         useContentSize: true,
//         kiosk: true,
//     })

//     setTimeout(function () {

//         var mainScreen = screen.getPrimaryDisplay();
//         var dimensions = mainScreen.size;

//         const view = new BrowserView()
//         const width = dimensions.width
//         const height = dimensions.height
//         win.addBrowserView(view)
//         view.setBounds({
//             x: 0,
//             y: 0,
//             width: width,
//             height: height
//         })
//         view.setAutoResize({
//             width: true,
//             height: true
//         });
//         view.webContents.loadURL('https://stats.uptimerobot.com/JNXGPFB01o')


//         // const secondView = new BrowserView()
//         // win.addBrowserView(secondView)
//         // secondView.setBounds({
//         //     x: 0,
//         //     y: Math.round(height/2),
//         //     width: width,
//         //     height: Math.round(height/2)
//         // })
//         // secondView.setAutoResize({
//         //     width: true,
//         //     height: true
//         // });
//         // secondView.webContents.loadURL('https://electronjs.org')
//         // app.on('window-all-closed', () => {
//         //     win.removeBrowserView(secondView)
//         //     win.removeBrowserView(view)
//         //     app.quit()
//         // })

//     }, 10);

// }