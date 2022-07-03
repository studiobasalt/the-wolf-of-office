class View{
    constructor(db){
        this.db = db
    }
    async init(){
        // create tabel if not exists with columns
        // name, id, timeout, device_ids
        // where device_ids is a comma separated list of device ids
        // where id is the primary key
        // where device_ids is a foreign key to device table
        await this.db.run(`CREATE TABLE IF NOT EXISTS view (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            timeout INTEGER
        )`)
    }

    async add(name, timeout=0){
        // Insert a row with name if not exists and return the id
        const row = await this.db.run(`INSERT OR IGNORE INTO view (name, timeout) VALUES ('${name}', ${timeout})`)
        return row.lastID
    }

    async get(id, join=false){
        // if join is true, join view.id with viewSection.view_id
        // and return view with viewSections
        let view = await this.db.get(`SELECT * FROM view WHERE id = ${id}`)
        if(join){
            view.viewSections = await this.joinSection(view)
        }
        return view
    }

    async getAll(){
        return await this.db.all(`SELECT * FROM view`)
    }

    async delete(id){
        // delete joined rows from viewSection
        // delete row from view
        await this.db.run(`DELETE FROM viewSection WHERE view_id=${id}`)
        await this.db.run(`DELETE FROM view WHERE id=${id}`)
    }

    async joinSection(view){
        return await this.db.all(`SELECT * FROM viewSection WHERE view_id = ${view.id}`)
    }
}

export default View