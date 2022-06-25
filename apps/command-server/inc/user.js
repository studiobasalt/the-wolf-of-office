// import db from '../../../lib/db'


class User {
    constructor(name) {
        this.name = name
    }

    getPremissions(){
        if (this.premissions) {
            return this.premissions
        }
        return this.premissions = db.getCapabilities(this.name, 'user')
    }

    userCan(level){
        currentLevels = db.getUserCapabilities(name, 'user')
        if (!currentLevels) {
            return false
        }
        return currentLevels.includes(level)
    }
}

export default User
