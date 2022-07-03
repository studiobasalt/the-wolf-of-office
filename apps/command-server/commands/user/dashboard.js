import Base from '../base.js'
import generateHelp from '../../formats/slack-msg/help.js'
import DashboardModelMain from '../../formats/views/dashboard-view-select.js'

class Dasboard extends Base {
    constructor() {
        super()
        this.name = 'Dasboard'
        this.description = "Command control for the office dashboards"
        this.subCommands = [
            { name: 'controls', description: 'Open the dashboard controls' },
            { name: 'refresh', description: 'Refresh the dashboard' },
        ]
    }

    async run() {
        // if subcommand is not set, show help
        if(!this.args || this.args.length === 1) {
            await this.controls()
            return
        }
        // switch on the sub command
        const subCommand = this.args[1]
        if(subCommand === 'help') {
            await this.help()
            return
        }
        if(subCommand === 'controls') {
            await this.controls()
            return
        }
        if(subCommand === 'refresh') {
            // await this.refresh()
            return
        }
        // if subcommand is not found, show help
        await this.help()
    }

    async controls() {
        const blocks = new DashboardModelMain().render()
        await this.openView(blocks)
    }

    async help() {
        const helpBlocks = generateHelp([this])
        await this.say('Help commands for dashboard control', helpBlocks, true)    
    }
}


export default Dasboard