import fs from 'fs'
import appRoot from 'app-root-path'

class ClassLoader{
    constructor(){
        this.commands = this.getCommands()
        this.interactions = this.getInteractions()
    }

    // list all files in the directory of the variable dir and return an array of file locations
    listFiles(dir) {
        dir = appRoot + '/apps/command-server/' + dir;
        var files = fs.readdirSync(dir);
        var jsFiles = [];
        for (var i = 0; i < files.length; i++) {
            if (files[i].endsWith('.js')) {
                jsFiles.push(dir + files[i]);
            }
        }
        return jsFiles;
    }

    // initalize the _class class and return an array of _class objects
    async importFromFolder(dir){
        const files = this.listFiles(dir)
        const classes = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            let _class = false;
            const module = await import(file).then((module) => {
                _class = module.default;
            })
            classes.push(new _class())
        }
        return classes
    }

    async getCommands(){
        const userCommands = await this.importFromFolder('commands/user/')
        // const sysCommands = this.importFromFolder('../user-commands/sys/')
        // const dashbaordCommands = this.importFromFolder('../user-commands/dash/')
        // return userCommands.concat(sysCommands,dashbaordCommands)
        return userCommands
    }

    async getInteractions(){
        await this.importFromFolder('interactions/user/')
    }
}

// export default ClassLoader
const classLoader = new ClassLoader()
export default classLoader