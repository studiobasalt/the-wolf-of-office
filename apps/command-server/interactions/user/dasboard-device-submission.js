import InteractionBase from '../interaction-base.js'

class Template extends InteractionBase{
    constructor(){
        super()
        this.testTrigger = () => {
            return this.matchViewSubmission("dashboard-device-submission")
        }
    }
    async run(){
        for (const index in this.state) {
            const deviceState = this.state[index]
            // split index by - get last part and set als id
            const deviceId = index.split('-')[1]
            // parse view id from state
            let selectedViews = deviceState.selected_options.map((option) => {
                return option.value.split('-')[1]
            })
            // Set views for device in db
            await this.db.dashboard.device.setView(deviceId, selectedViews)
        }
    }
}

export default Template