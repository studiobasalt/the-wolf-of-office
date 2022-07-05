import BasicBlocks from "../BasicBlocks.js"
import db from "../../../../lib/db/index.js"

class DashboardModelMain extends BasicBlocks{
    constructor(user_id){
        super()
        this.user_id = user_id
    }

    async render(){
        return this.base
    }

    async init(){
        await db.init()
        this.base = {
            "type": "modal",
            "callback_id": "dashboard-device-submission",
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
        await this.setBlocks()
    }

    async setBlocks(){
        await this.setDeviceSetupBlock()
        
        this.push(
            this.getDevider()
        )
            
        await this.setViewButtonBlocks()
    }

    async setDeviceSetupBlock(){
        const devices = await db.dashboard.device.getAll()
        // loop each device and push a device block to the stack
        for (const index in devices) {
            const device = devices[index]
            this.push(
                await this.getDeviceBlock(device)
            )
        }
    }

    async getDeviceBlock(device){
        return {
            "type": "input",
            "element": {
                "type": "multi_static_select",
                "action_id": "device-" + device.id,
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select options",
                    "emoji": true
                },
                "options": await this.getDeviceOptions(),
                "initial_options": await this.getActiveDeviceViews(device)
            },
            "label": {
                "type": "plain_text",
                "text": "Device:" + device.name,
                "emoji": true
            }
        }
    }

    async getDeviceOptions(device){
        const views = await db.dashboard.view.getAll()
        let options = []
        // add Default option
        options.push({
            "text": {
                "type": "plain_text",
                "text": "Empty screen",
                "emoji": true
            },
            "value": "view-empty"
        })
        for (const index in views) {
            const view = views[index]
            options.push(
                {
                    "text": {
                        "type": "plain_text",
                        "text": view.name,
                    },
                    "value": "view-" + view.id
                }
            )
        }
        return options
    }

    async getActiveDeviceViews(device){
        const views = await db.dashboard.device.joinView(device)
        let active = []
        for (const index in views) {
            const view = views[index]
            active.push({
                text: {
                    "type": "plain_text",
                    "text": view.name,
                },
                value: 'view-' + view.id
            })
        }
        // if active empty push empty option
        if(active.length === 0){
            active.push({
                text: {
                    "type": "plain_text",
                    "text": "Empty screen",
                    "emoji": true
                },
                value: "view-empty"
            })
        }
        return active
    }

    async setViewButtonBlocks(){
        let views = await db.dashboard.view.getAll()
        views = views.map(view => {
            return this.getButton(view.name)
        })
        this.push({
            "type": "actions",
            "block_id": "dashboard-view-control",
            "elements": [
                ...views,
                this.getButton('Add view', 'primary', 'create_new_view'),
            ]
        })
    }

}

export default DashboardModelMain