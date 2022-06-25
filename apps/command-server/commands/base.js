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
        if (this.name !== this.args[0]) {
            return false
        }
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
    async say(message){
        let channel = this.body.channel_id
        if (this.body.channel_name === 'directmessage') {
            channel = this.body.user_id
        }
        try {
            await webclient.chat.postMessage({
                channel: channel,
                text: message
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