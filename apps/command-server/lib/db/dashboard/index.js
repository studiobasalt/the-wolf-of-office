import Device from './device.js'
import View from './view.js'
import ViewSecion from './view-section.js'

class Dashboard{
    constructor(db){
        this.db = db
        this.view = new View(this.db)
        this.viewSection = new ViewSecion(this.db)
        this.device = new Device(this.db, this)
    }
    async init(){
        await this.device.init()
        await this.view.init()
        await this.viewSection.init()
    }
}

export default Dashboard