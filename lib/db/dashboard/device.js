class Device{
    constructor(db, self){
        this.db = db
        this.self = self
    }
    async init(){
        // Create table device if not exists
        // with id, name, views
        // where name is unique
        // where id is primary key
        // where views has foreign keys to view
        await this.db.run(`CREATE TABLE IF NOT EXISTS device (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            view_ids TEXT,
            FOREIGN KEY(view_ids) REFERENCES view(id)
        )`)
    }
    async add(name, viewIds=null){
        // Insert a row with name and view_ids if not exists
        // and return the id
        const row = await this.db.run(`INSERT OR IGNORE INTO device (name, view_ids) VALUES ('${name}', '${viewIds}')`)
        return row.lastID
    }
    async delete(id){
        // get view_ids from device row
        // delete joined rows from view 
        // delete row from device
        const device = await this.get(id)
        const viewIds = device.view_ids.split(',')
        for(let viewId of viewIds){
            await this.self.view.delete(viewId)
        }
        await this.db.run(`DELETE FROM device WHERE id=${id}`)
    }
    async getAll(){
        return await this.db.all(`SELECT * FROM device`)
    }
    async get(id, join = false){
        let device = await this.db.get(`SELECT * FROM device WHERE id = ${id}`)
        if(join){
            device.views = await this.joinView(device)
        }
        return device
    }
    async addView(deviceId, viewId){
        // add viewid to device row with deviceid
        // check if viewid is already in device row
        // if not add viewid to device row
        // separate viewids with comma
        const device = await this.get(deviceId)
        const viewIds = device.view_ids ? device.view_ids.split(',') : []
        if(!viewIds.includes(viewId)){
            viewIds.push(viewId)
            await this.db.run(`UPDATE device SET view_ids='${viewIds.join(',')}' WHERE id=${deviceId}`)
        }
    }
    async joinView(device){
        // throw error if device.view_ids is not set
        if (!device.view_ids) {
            throw new Error('device.view_ids is not set')
        }
        return await this.db.all(`SELECT * FROM view WHERE id IN (${device.view_ids})`)
    }
}

export default Device