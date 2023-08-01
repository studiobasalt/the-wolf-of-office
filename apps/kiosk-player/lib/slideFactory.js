const { BrowserView, screen } = require('electron');
const mainWindow = require('./mainWindow.js');
const { log } = require('console');


class SlideFactory{
    constructor(view){
        this.sections = view.sections;
        this.windowSize = mainWindow.getSize();
        console.log(this.windowSize);
        this.width = this.windowSize[0];
        this.height = this.windowSize[1];

        for (const section of this.sections) {
            const view = this.addSection(section);
        }
    }

    addSection(section){
        const view = new BrowserView({
            webPreferences: {
                session: mainWindow.webContents.session
            }
        });
        mainWindow.addBrowserView(view);
        view.setBounds({
            x: this.getWidth(section.x),
            y: this.getHeight(section.y),
            width: this.getWidth(section.width),
            height: this.getHeight(section.height)
            // x: 0,
            // y: 0,
            // width: 800,
            // height: 800
        });
        view.webContents.loadURL(section.url);
        section.view = view;
    }

    getWidth(width){
        return Math.ceil(this.width / 100 * width)
    }

    getHeight(height){
        return Math.ceil(this.height / 100 * height)
    }
}

module.exports = SlideFactory