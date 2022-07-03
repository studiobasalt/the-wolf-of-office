import database from './db.js'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import appRoot from 'app-root-path'


beforeAll(async () => {
    database.file = appRoot + '/res/db.test.sqlite'
    await database.init()
});

afterAll(async () => {
    await database.removeAllTabels()
});

describe('database is a class and contain main propertys', () => {
    it('Its a class', () => {
        expect(database).toBeInstanceOf(Object)
    })
    it('Has a property database', () => {
        expect(database).toHaveProperty('db')
    })
    it('Has a property dashboard an is a object', () => {
        expect(database).toHaveProperty('dashboard')
    })
})

describe('database.Dashboard is a class and contain main propertys', () => {
    it('Its a class', () => {
        expect(database.dashboard).toBeInstanceOf(Object)
    })
    it('Has a property database', () => {
        expect(database.dashboard).toHaveProperty('db')
        expect(database.dashboard.db).toBeInstanceOf(Object)
    })
    it('Has a property device an is a object', () => {
        expect(database.dashboard).toHaveProperty('device')
        expect(database.dashboard.device).toBeInstanceOf(Object)
    })
    it('Has a property view an is a object', () => {
        expect(database.dashboard).toHaveProperty('view')
        expect(database.dashboard.view).toBeInstanceOf(Object)
    })
})

describe('database.Dashboard.Device is a class and contain main propertys', () => {
    it('Its a class', () => {
        expect(database.dashboard.device).toBeInstanceOf(Object)
    })
    it('Has a property database', () => {
        expect(database.dashboard.device).toHaveProperty('db')
        expect(database.dashboard.device.db).toBeInstanceOf(Object)
    })
    it('Has a method init', () => {
        expect(database.dashboard.device).toHaveProperty('init')
        expect(database.dashboard.device.init).toBeInstanceOf(Function)
    })
})

describe('Dashboard.Device methodes are working', () => {
    it('Dashboard.Device.init()', async () => {
        await database.dashboard.device.init()
        // Database table device is created
        const hasTabel = await database.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='device'`)
        expect(hasTabel).toHaveProperty('name')
    })
    it('Dashboard.Device.add()', async () => {
        await database.dashboard.device.add('Test')
        // Database table device has a row with name Test
        const hasRow = await database.db.get(`SELECT name FROM device WHERE name='Test'`)
        expect(hasRow).toHaveProperty('name')
    })
    it('Dashboard.Device.getAll()', async () => {
        const devices = await database.dashboard.device.getAll()
        expect(devices).toBeInstanceOf(Array)
        expect(devices.length).toBeGreaterThanOrEqual(1)
        expect(devices[0]).toHaveProperty('id')
        expect(devices[0]).toHaveProperty('name')
    })
})

describe('database.Dashboard.View is a class and contain main propertys', () => {
    it('Its a class', () => {
        expect(database.dashboard.view).toBeInstanceOf(Object)
    })
    it('Has a property database', () => {
        expect(database.dashboard.view).toHaveProperty('db')
        expect(database.dashboard.view.db).toBeInstanceOf(Object)
    })
    it('Has a method init', () => {
        expect(database.dashboard.view).toHaveProperty('init')
        expect(database.dashboard.view.init).toBeInstanceOf(Function)
    })
})

describe('Dashboard.View methodes are working', () => {
    it('Dashboard.View.init()', async () => {
        await database.dashboard.view.init()
        // Database table view is created
        const hasTabel = await database.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='view'`)
        expect(hasTabel).toHaveProperty('name')
    })
    it('Dashboard.View.parseXYWH()', async () => {
        const out = await database.dashboard.view.parseXYWH("0,0,1,1")
        expect(out).toHaveProperty('x')
        expect(out).toHaveProperty('y')
        expect(out).toHaveProperty('width')
        expect(out).toHaveProperty('height')
    })
    it('Dashboard.View.add()', async () => {
        await database.dashboard.view.add('Test', 'Test', 1, "0,0,1,1")
        // Database table view has a row with name Test
        const row = await database.db.get(`SELECT * FROM view WHERE name='Test'`)
        expect(row).toHaveProperty('name')
        expect(row).toHaveProperty('id')
        expect(row).toHaveProperty('name')
        expect(row).toHaveProperty('x')
        expect(row).toHaveProperty('y')
        expect(row).toHaveProperty('width')
        expect(row).toHaveProperty('height')
        expect(row).toHaveProperty('device_id')
    })
    it('Dashboard.View.getAll()', async () => {
        const views = await database.dashboard.view.getAll()
        expect(views).toBeInstanceOf(Array)
        expect(views.length).toBeGreaterThanOrEqual(1)
    })
    it('Dashboard.View.get()', async () => {
        const view = await database.dashboard.view.get(1)
        expect(view).toHaveProperty('id')
        expect(view.id).toBe(1)
    })
    it('Dashboard.View.update()', async () => {
        await database.dashboard.device.add('Test2')
        await database.dashboard.device.add('Test3')
        await database.dashboard.view.update(1, 'Test1', 'Test1', [1,2,3], "1,1,2,2")
        const view = await database.dashboard.view.get(1)
        expect(view).toHaveProperty('name')
        expect(view.name).toBe('Test1')
        expect(view).toHaveProperty('id')
        expect(view.id).toBe(1)
        expect(view).toHaveProperty('url')
        expect(view.url).toBe('Test1')
        expect(view).toHaveProperty('x')
        expect(view.x).toBe(1)
        expect(view).toHaveProperty('y')
        expect(view.y).toBe(1)
        expect(view).toHaveProperty('width')
        expect(view.width).toBe(2)
        expect(view).toHaveProperty('height')
        expect(view.height).toBe(2)
        expect(view).toHaveProperty('device_id')
        expect(view.device_id).toBe('1,2,3')
    })
    it('Dashboard.View.testInputs()', async () => {
        let t = async () => {
            return await database.dashboard.view.testInputs("Test")
        }
        expect(t).rejects.toThrow(Error)

        t = async () => {
            return await database.dashboard.view.testInputs("Test", "")
        }
        expect(t).rejects.toThrow(Error)

        // new promis 
        // t = new Promise((resolve, reject) => {
        //     try{
        //         database.dashboard.view.testInputs("Test", "")
        //         resolve(true)
        //     } catch(e){
        //         reject(e)
        //     }
            
        // })
        // // except t to be resolved and not throw an error
        // expect(t).resolves.toBe(true)
    })
    it('Dashbaord.View.delete()', async () => {
        await database.dashboard.view.delete(1)
        const view = await database.dashboard.view.get(1)
        expect(view).toBe(undefined)
    })
})

describe('Database cleanup', () => {
    it('Clear the database and no tables in the database', async () => {
        await database.removeAllTabels()
        const hasTabel = await database.db.get(`SELECT name FROM sqlite_master WHERE type='table'`)
        expect(hasTabel).toBeUndefined()
    })
})