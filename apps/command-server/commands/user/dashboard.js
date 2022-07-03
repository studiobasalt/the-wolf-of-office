import Base from '../base.js'
import DashboardModelMain from '../../slack-blocks/views/dashboard-main-edit.js'

class Dasboard extends Base {
    constructor() {
        super()
        this.name = 'Dasboard'
        this.description = "Command control for the office dashboards"
    }

    async run() {
        const blocks = new DashboardModelMain(this.user_id).render()
        await this.openView(blocks)
    }

}

export default Dasboard