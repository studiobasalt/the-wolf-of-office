import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import appRoot from 'app-root-path'

class DB{
    constructor(){
        this.file = appRoot + '/res/db.sqlite'
    }

    async init(){
        this.db = await open({
            filename: this.file,
            driver: sqlite3.Database
        })
        this.dashboard = new Dashboard(this.db)
    }

    removeAllTabels(){
        this.db.exec('DROP TABLE IF EXISTS device')
        this.db.exec('DROP TABLE IF EXISTS view')
    }
}

class Dashboard{
    constructor(db){
        this.db = db
        this.device = new Device(this.db)
        this.view = new View(this.db)
    }
}

class Device{
    constructor(db){
        this.db = db
    }
    async init(){
        // Create table if not exists with columns id, name where name is a unique key
        await this.db.run(`CREATE TABLE IF NOT EXISTS device (id INTEGER PRIMARY KEY, name TEXT UNIQUE)`)
    }
    async add(name){
        // Insert a row with name if not exists
        await this.db.run(`INSERT OR IGNORE INTO device (name) VALUES ('${name}')`)
    }
    async getAll(){
        return await this.db.all(`SELECT * FROM device`)
    }
}

class View{
    constructor(db){
        this.db = db
    }
    async init(){
        // create tabel if not exists with columns
        // id, name, url, device_id, x, y, width, height
        // where device_id is a foreign key to multiple rows in device table
        // where name is a unique key
        await this.db.run(`CREATE TABLE IF NOT EXISTS view (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            url TEXT,
            device_id INTEGER,
            x INTEGER,
            y INTEGER,
            width INTEGER,
            height INTEGER,
            FOREIGN KEY (device_id) REFERENCES device(id)
        )`)
    }

    async add(name, url, device_id, rawXYWH){
        const { x, y, width, height } = this.parseXYWH(rawXYWH)
        // Insert a row with name if not exists
        await this.db.run(`INSERT OR IGNORE INTO view (name, url, device_id, x, y, width, height) VALUES ('${name}', '${url}', '${device_id}', '${x}', '${y}', '${width}', '${height}')`)
    }

    async testInputs(name, url, device_id, rawXYWH){
        // all inputs are required
        if(!name) throw new Error('Name is required')
        if(!url) throw new Error('Url is required')
        if(!device_id) throw new Error('Device id is required')
        if(!rawXYWH) throw new Error('XYWH is required')     

        // name is longer than 3 characters and shorter than 20 characters
        // throw error if not
        if(name.length < 3 || name.length > 20) throw new Error('Name must be between 3 and 20 characters long')

        // url is valid
        // throw error if not
        if(!url.match(/^(http|https):\/\/[^ "]+$/)) throw new Error('URL must be valid')

        // device id is a integer
        // device_id exists in device table
        // throw error if not
        if(!device_id || !(await this.db.get(`SELECT * FROM device WHERE id = ${device_id}`))) throw new Error('Device id must be valid')

        //test rawXYWH
        this.parseXYWH(rawXYWH)
    }

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

    async getAll(){
        return await this.db.all(`SELECT * FROM view`)
    }

    async get(id){
        return await this.db.get(`SELECT * FROM view WHERE id = ${id}`)
    }

    // Update view with id
    // where all fields except id are optional
    async update(id, name, url, device_id, rawXYWH){
        const { x, y, width, height } = this.parseXYWH(rawXYWH)
        let sql = `UPDATE view SET`
        if(name) sql += ` name = '${name}'`
        if(url) sql += `, url = '${url}'`
        if(device_id) sql += `, device_id = '${device_id}'`
        if(x) sql += `, x = '${x}'`
        if(y) sql += `, y = '${y}'`
        if(width) sql += `, width = '${width}'`
        if(height) sql += `, height = '${height}'`
        sql += ` WHERE id = ${id}`
        await this.db.run(sql)
    }

    async delete(id){
        await this.db.run(`DELETE FROM view WHERE id = ${id}`)
    }
}

export default new DB()
