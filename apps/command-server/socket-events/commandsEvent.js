import Base from './base.js'
import classLoader from '../inc/classLoader.js'

class CommandsEvent extends Base{

    async init(){
        // Set commands in scope
        this.commands = await classLoader.commands

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
