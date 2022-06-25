import Command from '../base.js'

class Biem extends Command{
    constructor(){
        super()
        this.command = 'biem'
        this.capabilitiesLevel = 1
        this.description = 'Biem'
    }
    async run(){
        this.play('biem.mp3')
        await this.say('Biem!!!!!!!')
    }
}

export default Biem