import Base from './base.js'

class Template extends Base{
    constructor(){
        this.command = 'template'
        this.capabilitiesLevel = 5
        this.description = "Template to see how you can build a command"
    }

    run(){
        this.play('bell.mp3') // Play a sound in de res/sounds folde
        this.commands // Incetences of every slash command in the app
    }
}
