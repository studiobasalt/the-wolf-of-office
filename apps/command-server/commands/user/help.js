import Command from '../base.js'

class HelpCommand extends Command {
    constructor() {
        super()
        this.command = 'help'
        this.capabilitiesLevel = 1
        this.description = 'Help'
    }
    async run() {
        const text = `Available commands: \n${this.context.map(c => `${c.command} - ${c.description}`).join('\n')}`
        await this.say(text)
    }
}

export default HelpCommand