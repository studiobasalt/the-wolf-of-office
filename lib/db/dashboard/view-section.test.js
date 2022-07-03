import database from '../index.js'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import appRoot from 'app-root-path'

beforeAll(async () => {
    database.file = appRoot + '/res/db.view-section.test.sqlite'
    database.deleteStorage()
    await database.init()
})

describe('database.Dashboard.viewSection is a class and contain main propertys', () => {
    it('Its a class', () => {
        expect(database.dashboard.viewSection).toBeInstanceOf(Object)
    })
    it('Has a property database', () => {
        expect(database.dashboard.viewSection).toHaveProperty('db')
        expect(database.dashboard.viewSection.db).toBeInstanceOf(Object)
    })
    it('Has a method init', () => {
        expect(database.dashboard.viewSection).toHaveProperty('init')
        expect(database.dashboard.viewSection.init).toBeInstanceOf(Function)
    })
})

describe('Dashboard.View methodes are working', () => {
    it('Dashboard.View.init()', async () => {
        // Database table view is created
        const hasTabel = await database.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='viewSection'`)
        expect(hasTabel).toHaveProperty('name', 'viewSection')
    })
    it('Dashboard.viewSection.parseXYWH()', async () => {
        const out = await database.dashboard.viewSection.parseXYWH("0,0,1,1")
        expect(out).toHaveProperty('x')
        expect(out).toHaveProperty('y')
        expect(out).toHaveProperty('width')
        expect(out).toHaveProperty('height')
    })
    it('Dashboard.viewSection.add()', async () => {
        // Create a view
        const viewId = await database.dashboard.view.add('test')
        const id = await database.dashboard.viewSection.add('Test', 'Test', 1, "0,0,1,1", viewId)
        // Database table viewSection has a row with name Test
        const row = await database.db.get(`SELECT * FROM viewSection WHERE name='Test'`)
        expect(row).toHaveProperty('name', 'Test')
        expect(row).toHaveProperty('id', id)
        expect(row).toHaveProperty('x', 0)
        expect(row).toHaveProperty('y', 0)
        expect(row).toHaveProperty('width', 1)
        expect(row).toHaveProperty('height', 1)
        expect(row).toHaveProperty('url', 'Test')
        expect(row).toHaveProperty('view_id', viewId)
    })
    it('Dashboard.View.get()', async () => {
        const viewSection = await database.dashboard.viewSection.get(1)
        expect(viewSection).toHaveProperty('id', 1)
    })
    it('Dashboard.viewsection.update()', async () => {
        const viewId = await database.dashboard.view.add('test update')
        const deviceId = await database.dashboard.device.add('Test update', viewId)
        const viewSectionId = await database.dashboard.viewSection.add('Test', 'Test', viewId, "0,0,1,1")

        await database.dashboard.viewSection.update(viewSectionId, 'overwrite', 'Test1', [1,2,3], "1,1,2,2")
        const viewSection = await database.db.get(`SELECT * FROM viewSection WHERE id=${viewSectionId}`)
        expect(viewSection).toHaveProperty('name')
        expect(viewSection.name).toBe('overwrite')
        expect(viewSection).toHaveProperty('id')
        expect(viewSection.id).toBe(1)
        expect(viewSection).toHaveProperty('url')
        expect(viewSection.url).toBe('Test1')
        expect(viewSection).toHaveProperty('x')
        expect(viewSection.x).toBe(1)
        expect(viewSection).toHaveProperty('y')
        expect(viewSection.y).toBe(1)
        expect(viewSection).toHaveProperty('width')
        expect(viewSection.width).toBe(2)
        expect(viewSection).toHaveProperty('height')
        expect(viewSection.height).toBe(2)
        expect(viewSection).toHaveProperty('view_id')
    })
    // it('Dashboard.View.testInputs()', async () => {
    //     let t = async () => {
    //         return await database.dashboard.view.testInputs("Test")
    //     }
    //     expect(t).rejects.toThrow(Error)

    //     t = async () => {
    //         return await database.dashboard.view.testInputs("Test", "")
    //     }
    //     expect(t).rejects.toThrow(Error)
    // })
    // it('Dashbaord.View.delete()', async () => {
    //     await database.dashboard.view.delete(1)
    //     const view = await database.dashboard.view.get(1)
    //     expect(view).toBe(undefined)
    // })
})


afterAll(async () => {
    await database.close()
    await database.deleteStorage()
})