import { WebClient } from '@slack/web-api'
import env from '../../../lib/load-env.js'



class SlackConnector{
    constructor(){
        const botToken = env.SLACK_BOT_TOKEN
        this.webClient = new WebClient(botToken);
    }

    async say(message, blocks = false, hiddenMessage = false) {
        // if the message is direct we need to send it to the user
        let channel = this.body.channel_id
        const isDirectMessage = this.body.channel_name === 'directmessage'
        if (isDirectMessage) {
            channel = this.body.user_id
        }
        // select send method based on if the message is hidden or not
        let sendMethod = hiddenMessage && !isDirectMessage ? webclient.chat.postEphemeral : webclient.chat.postMessage
        // send the message to the channel
        try {
            await sendMethod({
                channel: channel,
                text: message,
                blocks: blocks,
                hidden: hiddenMessage,
                user: this.body.user_id
            })
        } catch (error) {
            throw new NotInChannel("Could not send message: " + error)
        }
    }

    // Open in slack a view with the given blocks
    async openView(view) {
        try {
            await webclient.views.open({
                trigger_id: this.body.trigger_id,
                view: view
            })
        } catch (error) {
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