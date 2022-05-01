import db from '../../../lib/db'
import {PREMISSION_DEFAULT} from './consts'


class User {
    constructor(id) {
        this.id = id
        this.setData()
        if (!this.userExist()) {
            return false
        }
    }

    setData(){
        this.data = db.exec('')
    }

    userExist(){
        return false
    }

    setCurrentUserCapabilities(id){
        return this.data.capabilities ? this.data.capabilities : [PREMISSION_DEFAULT.name]
    }

    userCan(level){
        currentUserLevels = this.getCurrentUserCapabilities(id)
        return currentUserLevel.includes(level)
    }
}
