import BasicBlocks from "../BasicBlocks.js"
import db from "../../../../lib/db.js"

class DashboardModelMain extends BasicBlocks{
    constructor(user_id){
        super()
        this.setup()
        this.setBlocks()
        this.user_id = user_id
        db.init()
    }

    render(){
       return this.base
    }

    setup(){
        this.base = {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "Setup Dashboards",
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
        this.base.blocks = [
            this.getDeviceSetupBlocks(),
            this.getDevider(),
            this.getViewButtonBlocks()
        ]
    }

    getDeviceSetupBlocks(device){
        return {
            "type": "input",
            "element": {
                "type": "multi_static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select options",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ],
                // "action_id": "multi_static_select-action"
            },
            "label": {
                "type": "plain_text",
                "text": "Screen 1",
                "emoji": true
            }
        }
    }

    getViewButtonBlocks(){
        return {
            "type": "actions",
            "block_id": "dashboard-view-control",
            "elements": [
                this.getButton('View1'),
                this.getButton('View2'),
                this.getButton('Add view', 'primary', 'create_new_view'),
            ]
        }
    }

}

export default DashboardModelMain