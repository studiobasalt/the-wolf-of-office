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
        const device = await this.get(id, true)
        for(let viewId of device.view_ids){
            await this.self.view.delete(viewId)
        }
        await this.db.run(`DELETE FROM device WHERE id=${id}`)
    }
    async getAll(){
        return await this.db.all(`SELECT * FROM device`)
    }
    async get(id, join = false){
        let sql = `SELECT * FROM device WHERE id=${id}`
        // if id is a string set sql to search by name 
        if(typeof id === 'string'){
            sql = `SELECT * FROM device WHERE name='${id}'`
        }
        const device = await this.db.get(sql)
        if(join){
            device.views = await this.joinView(device)
        }
        return device
    }
    async setView(deviceId, viewIds){
        viewIds = viewIds.filter(id => id !== 'empty')
        await this.db.run(`UPDATE device SET view_ids='${viewIds.join(',')}' WHERE id=${deviceId}`)
    }
    async joinView(device){
        device.view_ids = device.view_ids ? device.view_ids.split(',') : []
        // Filter out empty string id from device.view_ids
        const ids = []
        for(let viewId of device.view_ids){
            if(viewId !== 'null' && viewId !== null){
                ids.push(await this.self.view.get(viewId, true))
            }
        }
        return ids
    }
}

export default Device