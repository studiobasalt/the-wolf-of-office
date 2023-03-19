import { WebClient } from '@slack/web-api'
import env from './load-env.js'

class SlackConnector{
    constructor(){
        const botToken = env.SLACK_BOT_TOKEN
        this.webclient = new WebClient(botToken);
    }

    async say(message, body, blocks = false, hiddenMessage = false) {
        // if the message is direct we need to send it to the user
        let channel = body.channel_id
        const isDirectMessage = body.channel_name === 'directmessage'
        if (isDirectMessage) {
            channel = body.user_id
        }
        // select send method based on if the message is hidden or not
        let sendMethod = hiddenMessage && !isDirectMessage ? this.webclient.chat.postEphemeral : this.webclient.chat.postMessage
        // send the message to the channel
        try {
            await sendMethod({
                channel: channel,
                text: message,
                blocks: blocks,
                hidden: hiddenMessage,
                user: body.user_id
            })
        } catch (error) {
            throw new NotInChannel("Could not send message: " + error)
        }
    }

    // Open in slack a view with the given blocks
    async openView(view, body, update = false) {
        try {
            const clientMode = update ? this.webclient.views.push : this.webclient.views.open
            await clientMode({
                trigger_id: body.trigger_id,
                response_action: "push",
                view: view,
            })
        } catch (error) {
            console.log(error);
            throw new Error("Could not open view: " + error)
        }
    }
}

class NotInChannel extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotInChannelError'
    }
}

export default new SlackConnector()