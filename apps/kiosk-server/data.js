class Data{
    async init(){
        // Load libs
        const env = await import('../../lib/load-env.js')
        const db = await import('../../lib/db/index.js')
        // setup vars
        this.env = env.default;
        this.db = db.default;
        await this.db.init()
        // set data
        await this.update()
        return this;
    }

    async update(){
        this.device = await this.db.dashboard.device.get(this.env['DEVICE_NAME'], true)
        this.views = this.device.views
        return this;
    }
}

module.exports = new Data().init()