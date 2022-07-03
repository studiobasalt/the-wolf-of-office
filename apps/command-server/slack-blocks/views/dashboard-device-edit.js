import BasicBlocks from '../BasicBlocks.js'

class DashbaordViewEdit extends BasicBlocks{
    constructor(user_id){
        super()
        this.setup()
        this.setBlocks()
        this.user_id = user_id
    }

    render(){
        return this.base
    }

    setup(){
        this.base = {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "Setup Dashboards Devices",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": []
        }
    }

    setBlocks(){
        this.setViewSettingBlocks()
        this.push(
            this.getDevider(),
        )
    }

    setViewSettingBlocks(){
        this.push(
            this.getInput('View Name'),
        )
        this.push(
            this.getInput('Timeout (seconds) for next view if there is one'),
        )
    }

    setViewSection(index, isLast = false){
        this.push(
            this.getHeading('View Section ' + index),
        )
        this.push(
            this.getInput('View URL'),
        )
        this.push(
            this.getInput('View Position (in procentage) x y width height'),
        )
        this.push(
            {
                "type": "actions",
                "elements": [
                    this.getButton('Add', 'primary', 'add-view-section-action'),
                    this.getButton('Delete', 'danger', 'delete_view_section_' + index)
                ]
            }
        )
        if(!isLast){
            this.push(
                this.getDevider(),
            )
        }
    }
  
}
    
export default DashbaordViewEdit