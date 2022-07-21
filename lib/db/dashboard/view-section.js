class ViewSection{
    constructor(db){
        this.db = db
    }
    async init(){
        // create tabel if not exists with columns
        // id, name, url, view_id, x, y, width, height, zoom, reload_interval
        // where view_id is a foreign key to multiple rows in device table
        // where name is a unique key
        // where zoom defaults to 1
        // where reload_interval defaults to 0
        await this.db.run(`CREATE TABLE IF NOT EXISTS viewSection (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            url TEXT,
            view_id INTEGER,
            x INTEGER,
            y INTEGER,
            width INTEGER,
            height INTEGER,
            zoom INTEGER DEFAULT 1,
            reload_interval INTEGER DEFAULT 0,
            FOREIGN KEY (view_id) REFERENCES view(id)
        )`)
    }

    async add(name, url, view_id, rawXYWH, zoom=1, reload_interval=0){
        const { x, y, width, height } = this.parseXYWH(rawXYWH)
        // Insert a row with name if not exists and join 
        // where view_id is a foreign key to a row in view table
        const row = await this.db.run(`INSERT OR IGNORE INTO viewSection (
            name,
            url,
            view_id,
            x,
            y,
            width,
            height,
            zoom,
            reload_interval
        ) VALUES (
            '${name}',
            '${url}',
            ${view_id},
            ${x},
            ${y},
            ${width},
            ${height},
            ${zoom},
            ${reload_interval}
        )`)
        return row.lastID
    }

    parseXYWH(rawXYWH){
        // return { x, y, width, height } with default values
        // if rawXYWH is not defined
        if(!rawXYWH) return { x: false, y: false, width: false, height: false }
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
    async update(id, name, url, view_id, rawXYWH, zoom, reload_interval){
        const { x, y, width, height } = this.parseXYWH(rawXYWH)
        let comma = ''
        let sql = `UPDATE viewSection SET`
        let prepareProperty = (prop, value) => {
            if(!value) {
                return
            }
            sql += `${comma} ${prop} = '${value}'`
            comma = ','
        }
        prepareProperty('name', name)
        prepareProperty('url', url)
        prepareProperty('view_id', view_id)
        prepareProperty('x', x)
        prepareProperty('y', y)
        prepareProperty('width', width)
        prepareProperty('height', height)
        prepareProperty('zoom', zoom)
        prepareProperty('reload_interval', reload_interval)
        sql += ` WHERE id = ${id}`
        await this.db.run(sql)
    }
}

export default ViewSection