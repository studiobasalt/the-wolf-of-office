import InteractionBase from 'interaction-base.js'

class Template extends InteractionBase{
    constructor(){
        super()
        this.action_id = ""; //Overwrite in extend
    }
    async run(){
        await this.say(text, blocks, hiddenMessage)
        await this.openView(view)
        this.proxyCommand(name)
        this.play('bell.mp3')
    }
}

export default Template