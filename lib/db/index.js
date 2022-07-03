import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import appRoot from 'app-root-path'
import Dashboard from './dashboard/index.js'
import fs from 'fs'

class DB{
    constructor(){
        this.file = appRoot + '/res/db.sqlite'
    }

    async init(){
        if(this.db){
            return false
        }
        this.db = await open({
            filename: this.file,
            driver: sqlite3.Database
        })
        this.dashboard = new Dashboard(this.db)
        await this.dashboard.init()
    }

    removeAllTabels(){
        this.db.exec('DROP TABLE IF EXISTS device')
        this.db.exec('DROP TABLE IF EXISTS view')
        this.db.exec('DROP TABLE IF EXISTS viewSection')
    }

    async deleteStorage(){
        if(fs.existsSync(this.file)){
            await fs.unlinkSync(this.file)
        }
    }

    async close(){
        await this.db.close()
    }
}

export default new DB()
