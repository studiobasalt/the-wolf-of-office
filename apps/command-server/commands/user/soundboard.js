import Base from '../base.js'
import viewgenerator from '../../formats/views/soundboard.js'

class SoundBoard extends Base{
    constructor(){
        super()
        this.name = 'soundboard'
        this.capabilitiesLevel = 5
        this.description = "SoundBoard to play sounds"
    }

    async run(){
        await this.openView(viewgenerator())
    }
}

export default SoundBoard