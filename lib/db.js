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
        this.exec('CREATE TABLE IF NOT EXISTS users (name TEXT, id INT)')
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

}

export default new DB()
