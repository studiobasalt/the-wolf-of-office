class BasicBlocks{

    push(block){
        this.base.blocks.push(block)
    }
    
    getButton(name, style = false, action_id){
        let button = {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": name,
                "emoji": true
            },
            "value": name,
        }
        // add style primary if main
        if(style){
            button.style = style
        }
        // add action_id if set
        if(action_id){
            button.action_id = action_id
        }
        return button
    }

    getDevider(){
        return {
            "type": "divider"
        }
    }

    getHeading(title){
        return                 {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": title,
                "emoji": true
            }
        }
    }

    getInput(label){
        return {
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-action"
			},
			"label": {
				"type": "plain_text",
				"text": label,
				"emoji": true
			}
		}
    }
}

export default BasicBlocks