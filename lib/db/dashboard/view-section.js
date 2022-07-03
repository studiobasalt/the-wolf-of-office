class ViewSection{
    constructor(db){
        this.db = db
    }
    async init(){
        // create tabel if not exists with columns
        // id, name, url, view_id, x, y, width, height
        // where view_id is a foreign key to multiple rows in device table
        // where name is a unique key
        await this.db.run(`CREATE TABLE IF NOT EXISTS viewSection (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            url TEXT,
            view_id INTEGER,
            x INTEGER,
            y INTEGER,
            width INTEGER,
            height INTEGER,
            FOREIGN KEY (view_id) REFERENCES view(id)
        )`)
    }

    async add(name, url, view_id, rawXYWH){
        const { x, y, width, height } = this.parseXYWH(rawXYWH)
        // Insert a row with name if not exists and join 
        // where view_id is a foreign key to a row in view table
        const row = await this.db.run(`INSERT OR IGNORE INTO viewSection (name, url, view_id, x, y, width, height) VALUES ('${name}', '${url}', ${view_id}, ${x}, ${y}, ${width}, ${height})`)
        return row.lastID
    }

    // async testInputs(name, url, view_ids, rawXYWH){
    //     // all inputs are required
    //     if(!name) throw new Error('Name is required')
    //     if(!url) throw new Error('Url is required')
    //     if(!view_ids) throw new Error('Device id is required')
    //     if(!rawXYWH) throw new Error('XYWH is required')     

    //     // name is longer than 3 characters and shorter than 20 characters
    //     // throw error if not
    //     if(name.length < 3 || name.length > 20) throw new Error('Name must be between 3 and 20 characters long')

    //     // url is valid
    //     // throw error if not
    //     if(!url.match(/^(http|https):\/\/[^ "]+$/)) throw new Error('URL must be valid')

    //     // device id is a integer
    //     // view_ids exists in device table
    //     // throw error if not
    //     if(!view_ids || !(await this.db.get(`SELECT * FROM device WHERE id = ${view_ids}`))) throw new Error('Device id must be valid')

    //     //test rawXYWH
    //     this.parseXYWH(rawXYWH)
    // }

    parseXYWH(rawXYWH){
        // rawXYWH is a string of the form x,y,width,height
        // return an object with x, y, width, height
        // throw error if not
        if(!rawXYWH.toString().match(/[0-9]+,[0-9]+,[0-9]+,[0-9]+/)) throw new Error('Input has to be a string of the form "x,y,width,height"')
        let [x, y, width, height] = rawXYWH.split(',')
        return {
            x: parseInt(x), 
            y: parseInt(y), 
            width: parseInt(width), 
            height: parseInt(height)
        }
    }

    async get(id){
        return await this.db.get(`SELECT * FROM view WHERE id = ${id}`)
    }

    // Update view with id
    // where all fields except id are optional
    async update(id, name, url, view_id, rawXYWH){
        const { x, y, width, height } = this.parseXYWH(rawXYWH)
        let sql = `UPDATE viewSection SET`
        if(name) sql += ` name = '${name}'`
        if(url) sql += `, url = '${url}'`
        if(view_id) sql += `, view_id = '${view_id}'`
        if(x) sql += `, x = '${x}'`
        if(y) sql += `, y = '${y}'`
        if(width) sql += `, width = '${width}'`
        if(height) sql += `, height = '${height}'`
        sql += ` WHERE id = ${id}`
        await this.db.run(sql)
    }

    // async delete(id){
    //     await this.db.run(`DELETE FROM view WHERE id = ${id}`)
    // }
}

export default ViewSection