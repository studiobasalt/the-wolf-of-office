import Base from './base.js'

class Command extends Base{

    async init(){
        // Set commands in scope
        this.commands = this.importAllCommands();

        //Listen to commands
        this.socket.on('slash_commands', async ({ body, ack }) => {
            try {
                if (body.command === "/wolf") {
                    console.log("UPDATE");
                    await this.test(body)
                }
                if (body.command === "/wolf-sys") {
                    await ack({"text": "Not build yet"})
                }
                if (body.command === "/wolf-dash") {
                    await ack({"text": "Not build yet"})
                }
                await ack()
            } catch (e) {
                await ack({"text": e})
            }
        });
    }

    listFilesJs(dir){

        return []
    }

    importFromFolder(dir, scope){
        const fileList = this.listFilesJs(dir)
        let commandList = []
        for (var index in fileList) {
            commandList[] = require(dir + fileList[index])
        }
        return commandList
    }

    importAllCommands(){
        const userCommands = this.importFromFolder('../user-commands/user/', 'user')
        const sysCommands = this.importFromFolder('../user-commands/sys/', 'sys')
        const dashbaordCommands = this.importFromFolder('../user-commands/dash/', 'dash')
        return new Array.merge(userCommands,sysCommands,dashbaordCommands) // Check syntax
    }

    processWolfCommands(body){
        for (var index in this.commands) {
            const command = new this.commands[index]
            if (!command.testTrigger(body)) {
                continue
            }
            if (!command.testPremission(body)) {

            }
        }
    }
}

export default Command
