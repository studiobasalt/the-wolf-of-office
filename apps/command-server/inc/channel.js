import db from '../../../lib/db'
import {PREMISSION_DEFAULT_CHANNEL} from './consts'


class Channel {
    constructor(name) {
        this.name = name
    }

    getPremissions(){
        if (this.premissions) {
            return this.premissions
        }
        return this.premissions = db.getCapabilities(this.name, 'channel')
    }

    channelCan(level){
        currentLevels = this.getPremissions()
        if (!currentLevels) {
            return false
        }
        return currentLevels.includes(level)
    }
}

export default Channel
