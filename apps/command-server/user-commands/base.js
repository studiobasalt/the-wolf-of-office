// import db from '../../../lib/db.js'
import User from '../inc/user.js'
import Channel from '../inc/channel.js'
import appRoot from 'app-root-path'
import sound from 'sound-play'
import webclient from '../inc/slackWebClient.js'

class Command{
    constructor(){
        this.command = false //Overwrite in extend
        this.capabilitiesLevel = 0 //Overwrite in extend
        this.description = "" // Overwrite in extend
    }
    async run(){
        throw new Error("Not implemented yet") // Overwrite in extend
    }
    async trigger(body, contextCommands){
        this.setup(body, contextCommands)
        if (this.command !== this.args[0]) {
            return false
        }
        if (!this.testPremission()) {
            throw new Error("You do not have permission to use this command")
        }
        await this.run()
        this.log()
        return true
    }
    setup(body, contextCommands){
        this.contextCommands = contextCommands
        this.setCommandArgs(body.text)
        this.body = body
        this.context = contextCommands
    }
    setCommandArgs(rawArgs){
        // split the raw args into an array
        this.args = rawArgs.split(' ') 
    }
    testPremission(){
        const user = this.body.user_id
        const channel = this.body.channel_id

        this.user = new User(user)
        this.channel = new Channel(channel)

        if (this.channel.can(this.capabilitiesLevel)) {
            return true
        }
        if (this.user.can(this.capabilitiesLevel)) {
            return true
        }
        return false
    }
    log(){
        const row = 'COMMAND: ' + this.command + '- BY USER: @' + this.body.user + ' - IN: ' + this.body.channel
        // db.log(row)
    }

    // play a sound file from the sounds folder
    play(file){
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

class NotInChannel extends Error{
    constructor(message){
        super(message)
        this.name = 'NotInChannelError'
    }
}

export default Command;