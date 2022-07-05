import InteractionBase from 'interaction-base.js'

class Template extends InteractionBase{
    constructor(){
        super()
        this.action_id = ""; //Test based on this.action_id // Default false

        //Test function where self is reffrence to this // Default false
        this.testTrigger = () =>{
            if(this.body.test === 'testje'){
                return true
            }
        }

        this.testTrigger = () => {
            return this.matchViewSubmission("dashboard-device-submission")
        }
    }
    async run(){
        await this.say(text, blocks, hiddenMessage)
        await this.openView(view)
        this.proxyCommand(name)
        this.play('bell.mp3')
    }
}

export default Template