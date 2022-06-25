import Command from '../base.js'
import generateHelp from '../../formats/slack-msg/help.js'

class HelpCommand extends Command {
    constructor() {
        super()
        this.name = 'help'
        this.capabilitiesLevel = 1
        this.description = 'Help'
    }
    async run() {
        const helpBlocks = generateHelp(this.context)
        await this.say('Help commands for wolf of office', helpBlocks, true)
    }
}

export default HelpCommand