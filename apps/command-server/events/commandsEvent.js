import Base from './base.js'
import fs from 'fs'
import appRoot from 'app-root-path'

class CommandsEvent extends Base{

    async init(){
        // Set commands in scope
        this.commands = await this.importAllCommands();

        //Listen to commands
        this.socket.on('slash_commands', async ({ body, ack }) => {
            try {
                await this.processWolfCommands(body)
            } catch (e) {
                console.log(e);
                if (e.name === 'NotInChannelError') {
                    await ack({text: 'Add me to a channel first to respond!'})
                } else {
                    await ack({"text": e})
                }
            }
            await ack()
        });
    }

    // list all files in the directory of the variable dir and return an array of file locations
    listFiles(dir) {
        dir = appRoot + '/apps/command-server/commands/' + dir;
        var files = fs.readdirSync(dir);
        var jsFiles = [];
        for (var i = 0; i < files.length; i++) {
            if (files[i].endsWith('.js')) {
                jsFiles.push(dir + files[i]);
            }
        }
        return jsFiles;
    }

    // initalize the command class and return an array of command objects
    async importFromFolder(dir){
        const files = this.listFiles(dir)
        const commands = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            // const command = require(file)
            let command = false;
            const module = await import(file).then((module) => {
                command = module.default;
            })
            commands.push(new command())
        }
        return commands
    }

    async importAllCommands(){
        const userCommands = await this.importFromFolder('user/')
        // const sysCommands = this.importFromFolder('../user-commands/sys/')
        // const dashbaordCommands = this.importFromFolder('../user-commands/dash/')
        // return userCommands.concat(sysCommands,dashbaordCommands)
        return userCommands
    }

    async processWolfCommands(body){
        for (var index in this.commands) {
            const command = this.commands[index]
            if (await command.trigger(body, this.commands)) {
                return
            }
        }
    }
}

export default CommandsEvent
