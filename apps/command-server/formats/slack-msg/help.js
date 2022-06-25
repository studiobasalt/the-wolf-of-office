
function generateMsg(commands) {
    let generateCommandBlock = (command) => {
        // generate the help block for the command
        let blocks = [{
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": `You ${command.hasPremission() ? 'have' : 'dont have'} permission to use this command`
                }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*/wolf ${command.name}* - ${command.description}`
            },
        },
        {
            "type": "divider"
        }]
        // if user has premission insert the button
        if (command.hasPremission() && false) { // enable this if implemented
            blocks[1].accessory = {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Run",
                    "emoji": true
                },
                "value": "click_me_123",
                "action_id": "button-action"
            }
        }
        return blocks;
    }

    // generate the help message
    let msg = [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "All commands for The Wolf Of Office bot",
                "emoji": true
            }
        }
    ]

    // Insert for each command the block with the command info
    commands.forEach(command => {
        let commandBlocks = generateCommandBlock(command)
        msg = msg.concat(commandBlocks)
    })

    return msg
}

export default generateMsg