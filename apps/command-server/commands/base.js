// import db from '../../../lib/db.js'
import appRoot from 'app-root-path'
import sound from 'sound-play'
import webclient from '../inc/slackWebClient.js'

class Command {
    constructor() {
        this.name = false //Overwrite in extend
        this.capabilitiesLevel = 0 //Overwrite in extend
        this.description = "" // Overwrite in extend
    }
    async run() {
        throw new Error("Not implemented yet") // Overwrite in extend
    }
    async trigger(body, context) {
        this.setup(body, context)

        if (this.args[0].toLowerCase() !== this.name.toLowerCase()) {
            return
        }

        // Run the command
        await this.run()

        // signal that the command has been processed
        return true
    }
    setup(body, context) {
        this.setCommandArgs(body.text)
        this.body = body
        this.context = context
    }
    setCommandArgs(rawArgs) {
        // split the raw args into an array
        this.args = rawArgs.split(' ')
    }
    hasPremission() {
        return true
    }

    // play a sound file from the sounds folder
    play(file) {
        const soundsFolder = appRoot + '/res/sounds/'
        const soundFile = soundsFolder + file
        sound.play(soundFile)
    }

    // send a slack message to the channel
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
}

class NotInChannel extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotInChannelError'
    }
}

export default Command;