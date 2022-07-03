import Base from '../base.js'
import generateHelp from '../../slack-blocks/slack-msg/help.js'
import DashboardModelMain from '../../slack-blocks/views/dashboard-control.js'

class Dasboard extends Base {
    constructor() {
        super()
        this.name = 'Dasboard'
        this.description = "Command control for the office dashboards"
    }

    async run() {
        const blocks = new DashboardModelMain().render()
        await this.openView(blocks)
    }

}

export default Dasboard