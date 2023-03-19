import Base from './base.js'

class Template extends Base{
    constructor(){
        super()
        this.name = 'template'
        this.capabilitiesLevel = 5
        this.description = "Template to see how you can build a command"
    }

    async run(){
        this.play('bell.mp3') // Play a sound in de res/sounds folde
        this.context // Get the context of all commands
        await this.say('Hello world', blocks, sendHidden) // Send a message in the channel
        await this.openView(blocks) // Open a view in the channel
    }
}

export default Template