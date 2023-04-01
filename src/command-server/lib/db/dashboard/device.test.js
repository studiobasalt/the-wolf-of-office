import database from '../index.js'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import appRoot from 'app-root-path'

beforeAll(async () => {
    database.file = appRoot + '/res/db.device.test.sqlite'
    database.deleteStorage()
    await database.init()
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
    it('Has a self property', () => {
        expect(database.dashboard.device).toHaveProperty('self')
        expect(database.dashboard.device.self).toBeInstanceOf(Object)
    })
})

describe('Dashboard.Device methodes are working', () => {
    it('Dashboard.Device.init()', async () => {
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
    it('Dashboard.Device.get() by id', async () => {
        const id = await database.dashboard.device.add('Test', 0)
        const device = await database.dashboard.device.get(id)
        expect(device).toHaveProperty('id')
        expect(device.id).toBe(id)
    })
    it('Dashboard.Device.get() by name', async () => {
        const id = await database.dashboard.device.add('Test', 0)
        const device = await database.dashboard.device.get('Test')
        expect(device).toHaveProperty('id')
        expect(device.id).toBe(id)
    })
    it('Dashboard.Device.getAll()', async () => {
        const devices = await database.dashboard.device.getAll()
        expect(devices).toBeInstanceOf(Array)
        expect(devices.length).toBeGreaterThanOrEqual(1)
        expect(devices[0]).toHaveProperty('id')
        expect(devices[0]).toHaveProperty('name')
    })
    it("Should not add a device twice", async () => {
        await database.dashboard.device.add('Test twice')
        await database.dashboard.device.add('Test twice')
        const rows = await database.db.all(`SELECT name FROM device WHERE name='Test twice'`)
        expect(rows.length).toBe(1)
    })
    it("Should return device id when add a device", async () => {
        const id = await database.dashboard.device.add('Test abc')
        expect(id).toBeGreaterThan(1)
    })
    it("Should delete a device", async () => {
        const viewId = await database.dashboard.view.add('Test delete view')
        const id = await database.dashboard.device.add('Test delete', viewId)
        const idSection = await database.dashboard.viewSection.add('Test', 'Test', viewId, "0,0,1,1")
        await database.dashboard.device.delete(id)
        const device = await database.dashboard.device.get(id)
        expect(device).toBe()
        const view = await database.dashboard.view.get(viewId)
        expect(view).toBe()
        const viewSection = await database.dashboard.viewSection.get(idSection)
        expect(viewSection).toBe()
    })
    it("Should set a view to a device", async () => {
        // add device
        const id = await database.dashboard.device.add('Test viewadd')
        // add view
        const viewId = await database.dashboard.view.add('view', 0)
        const viewId2 = await database.dashboard.view.add('view2', 0)
        // add view to device
        await database.dashboard.device.setView(id, [viewId])
        await database.dashboard.device.setView(id, [viewId2])
        // check if view is added to device
        let device = await database.dashboard.device.get(id, true)
        expect(device).toHaveProperty('views')
        expect(device.views).toBeInstanceOf(Array)
        expect(device.views.length).toBeGreaterThanOrEqual(1)
        expect(device.views[0]?.id).toBe(viewId2)
        expect(device.views[1]?.id).toBe()
        await database.dashboard.device.setView(id, [viewId2, viewId])
        device = await database.dashboard.device.get(id, true)
        // expect(device.views[0]?.id).toBe(viewId)
        // expect(device.views[1]?.id).toBe(viewId2)
    })
    it("Should set a empty screen to the device", async () => {
        // add device
        const id = await database.dashboard.device.add('Test screenadd')
        // set screen
        await database.dashboard.device.setView(id, ['empty'])
        // check if screen is added to device
        let device = await database.dashboard.device.get(id, true)
        expect(device).toHaveProperty('views')
        expect(device.views).toBeInstanceOf(Array)
        expect(device.views.length).toBe(0)
        // Multiple screens
        await database.dashboard.device.setView(id, [2, 'empty', 1])
        // check if screen is added to device
        device = await database.dashboard.device.get(id, true)
        expect(device).toHaveProperty('views')
        expect(device.views).toBeInstanceOf(Array)
        expect(device.views.length).toBe(2)
    })
    it("Should clear views after an empty set", async () => {
        // add device
        const id = await database.dashboard.device.add('Test clear empty')
        // set screen
        await database.dashboard.device.setView(id, [1,2,3])
        await database.dashboard.device.setView(id, ['empty'])
        // check if screen is added to device
        let device = await database.dashboard.device.get(id, true)
        expect(device).toHaveProperty('views')
        expect(device.views).toBeInstanceOf(Array)
        expect(device.views.length).toBe(0)
    })
    it("Should join a device to a view and a sub view", async () => {
        // add device and view and sub view
        const viewId = await database.dashboard.view.add('Test join view')
        const id = await database.dashboard.device.add('Test join', [viewId])
        const subViewId = await database.dashboard.viewSection.add('Test join sub view', 'Test join sub view', viewId, "0,0,1,1")

        // get device with join enabled
        let device = await database.dashboard.device.get(id, true)
        expect(device).toHaveProperty('views')
        expect(device.views).toBeInstanceOf(Array)
        expect(device.views.length).toBe(1)
        expect(device.views[0].viewSections).toBeInstanceOf(Array)
        expect(device.views[0].viewSections.length).toBe(1)
        expect(device.views[0].viewSections[0].id).toBe(subViewId)
    })
})



afterAll(async () => {
    await database.removeAllTabels()
    await database.close()
    await database.deleteStorage()
})