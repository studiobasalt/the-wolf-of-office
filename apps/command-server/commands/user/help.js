import Command from '../base.js'
import generateHelp from '../../slack-blocks/slack-msg/help.js'

class HelpCommand extends Command {
    constructor() {
        super()
        this.name = 'help'
        this.capabilitiesLevel = 1
        this.description = 'A list of all commands on the wolf of office'
    }
    async run() {
        const helpBlocks = generateHelp(this.context)
        await this.say('Help commands for wolf of office', helpBlocks, true)
    }
}

export default HelpCommand