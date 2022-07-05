import Base from '../base.js'
import DashboardModelMain from '../../slack-blocks/views/dashboard-device-edit.js'

class Dasboard extends Base {
    constructor() {
        super()
        this.name = 'Dasboard'
        this.description = "Command control for the office dashboards"
    }

    async run() {
        // Render slack blocks
        const modelBuilder = new DashboardModelMain(this.user_id)
        await modelBuilder.init()
        const model = await modelBuilder.render()

        // Open a modal
        await this.openView(model)
    }

}

export default Dasboard