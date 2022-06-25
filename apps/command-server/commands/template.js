import Base from './base.js'

class Template extends Base{
    constructor(){
        this.name = 'template'
        this.capabilitiesLevel = 5
        this.description = "Template to see how you can build a command"
    }

    run(){
        this.play('bell.mp3') // Play a sound in de res/sounds folde
        this.context // Get the context of all commands
    }
}
