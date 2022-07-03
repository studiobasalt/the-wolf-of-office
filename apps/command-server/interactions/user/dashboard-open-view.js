import InteractionBase from '../interaction-base.js'
import DashbaordViewEdit from '../../slack-blocks/views/dashboard-view-edit.js'

class DashboardOpenView extends InteractionBase{
    constructor(){
        super()
        this.action_id = "dashboard-view-control";
        this.testProperty = 'block_id'; //Overwrite in extend

    }
    async run(){
        this.play('biem.mp3')
        this.updateView(new DashbaordViewEdit().render())
    }
}

export default DashboardOpenView