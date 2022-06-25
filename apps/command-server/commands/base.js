// import db from '../../../lib/db.js'
import appRoot from 'app-root-path'
import slackConnector from '../inc/slackWebClient.js'
import playSound from '../inc/soundPlayer.js'

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
        playSound(file)
    }

    // send a slack message to the channel
    async say(message, blocks = false, hiddenMessage = false) {
        await slackConnector.say(message, this.body, blocks, hiddenMessage)
    }

    // Open in slack a view with the given blocks
    async openView(view) {
       await slackConnector.openView(view, this.body)
    }
}



export default Command;