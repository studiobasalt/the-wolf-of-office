import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import './load-env.js'
import appRoot from 'app-root-path'

class DB{
    constructor(){
        this.openDB()
        this.setDefaultTabels()
    }

    openDB(){
        this.db = open({
            filename: appRoot.path + '/res/sqlite3.db',
            driver: sqlite3.Database
        })
    }

    setDefaultTabels(){
        this.exec('CREATE TABLE IF NOT EXISTS premissions (name TEXT, id INT, level ARRAY, type OPTION(user,channel)') // Check syntax
        this.exec('CREATE TABLE IF NOT EXISTS options (key TEXT, value TEXT, id INT)') // AUTO ID
        this.exec('CREATE TABLE IF NOT EXISTS sync (tabel TEXT, timestamp INT)') // TYPES
        this.exec('CREATE TABLE IF NOT EXISTS dashboards (device TEXT, creator INT, url TEXT, x INT, y INT, offsetx INT, offsety, INT)') //TYPES
    }

    async prepare(){
        this.db.then((db) => {
            const stmt = db.prepare(
              'SELECT id FROM users WHERE 13 = @thirteen'
            )

            const result = await stmt.all({ '@thirteen': 13 })
        })
    }

    exec(query){
        this.db.then((db) => {
            let data = false
            try {
                data = db.exec(query)
            } catch (e) {
                console.error(e)
            }
            return data
        })

    }

    getCapabilities(name, type){
        const capabilities = db.run('') // sql
        return capabilities ? capabilities : false
    }

    getNowTimestamp(){
        return new Date.now()
    }

    setOption(key, value){
        const now = this.getNowTimestamp()
        this.db.run('') // SQL insert data with timestamp
    }

    setDashboard(creator, url, x, y , offsetX, offsetY){
        const device = env.DEVICE_NAME //check
        this.db.run('') //SQL insert data
    }

    getTimeStamp(tabelName){
        return this.exec('') // QURYT get timestamp out of tabel
    }

    syncTabel(sqldump, tabelName, newTimestamp){
        const oldTimestamp = this.getTimeStamp(tabelName)
        if (oldTimestamp >= newTimestamp) {
            return
        }
        const backupDump = this.dumpTabel(tabelName)
        try{
            this.clearTabel()
            this.restoreTabel(sqldump, tabelName)
        } catch (e){
            console.log(e);
            this.clearTabel()
            this.restoreTabel(backupDump, tabelName)
        }

    }

    clearTabel(tabelName){

    }

    restoreTabel(rawSQL, tabelName){

    }

    dumpTabel(tabelName){

    }

}

export default new DB()
