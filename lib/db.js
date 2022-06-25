import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import env from './load-env.js'
import appRoot from 'app-root-path'

const SYNC_KEY = 'sync_index'

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
        this.optionsTabel()
        this.setupDashboardTabel()
        console.log('Test all tabels db.js');
        debugger
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

    // Logger
    log(line){
        console.log('Insert row setup db ');
        debugger
    }

    // Options
    optionsTabel(){
        this.exec('CREATE TABLE IF NOT EXISTS options (key TEXT, value TEXT, id AUTOINCREMENT PRIMARY)') // AUTO ID
    }
    setOption(key, value){

        this.db.run('INSERT INTO options (key, value) VALUES (?,?)', key, value)
        if (key === SYNC_KEY) {
            return
        }
        this.updateSync()
    }
    async getOption(key){
        console.log('Get option test me db.js');
        debugger
        const optionRow = await this.db.run('SELECT FROM options WHERE (key) IS (?)', key)
        return optionRow.value
    }

    // Dashboard
    setupDashboardTabel(){
        this.exec('CREATE TABLE IF NOT EXISTS dashboards (id AUTOINCREMENT PRIMARY, device TEXT, creator TEXT, url TEXT, x INT, y INT, offsetx INT, offsety INT, context INT)') //TYPES
    }
    setDashboard(creator, url, x, y , offsetX, offsetY, context = 0){
        const device = env.DEVICE_NAME
        this.exec('INSERT INTO dashboards (device, creator, url, x, y, offsetx, offsety, context) VALUES (?,?,?,?,?,?,?)',
            device,
            creator,
            x,
            y,
            offsetX,
            offsetY,
            context
        )
        this.updateSync()
    }
    async getDashboards(device = env.DEVICE_NAME){
        console.log('Test get function');
        debugger
        const rows = await this.db.run('SELECT FROM options * WHERE device IS ?', device)
    }
    removeDashboard(id){
        console.log('Create SQL query to delete row')
        debugger
        this.exec('DELETE FROM options WHERE id IS ?', id)
        this.updateSync()
    }

    // DB sync
    async getSyncIndex(){
        const index = await this.getOption(SYNC_KEY)
        return parseInt(index)
    }
    async updateSync(){
        const currentIndex = await this.getSyncIndex()
        const newIndex = currentIndex + 1
        this.setOption(SYNC_KEY, newIndex)
    }
    async syncDB(newRawSQL, newSyncIndex){
        const currentSyncIndex = await this.getSyncIndex()
        if (currentSyncIndex >= newSyncIndex) {
            return
        }
        try{
            await this.resetDB()
            this.restoreTabel(newRawSQL)
        } catch (e){
            console.log(e)
            console.log('Als syc wil ik bij een error een slack bericht naar een channel');
            debugger
        }
    }
    async rawDumpDB(tabelName){
        console.log('Raw dum db');
        debugger
        await this.db
        return ""
    }
    async resetDB(){
        console.log('CLEAR db db.js');
        debugger
    }
    async restoreByDump(rawSQL){
        console.log('Restore full db by dump');
        debugger
    }

    // capabilities
    getCapabilities(name, type){
        console.log('setup capabilities');
        debugger
        const capabilities = db.run('') // sql
        return capabilities ? capabilities : false
    }


}

export default new DB()
