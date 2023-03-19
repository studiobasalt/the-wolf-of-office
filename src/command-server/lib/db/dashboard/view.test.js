import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import database from '../index.js'

beforeAll(async () => {
    database.file = './res/db.view.test.sqlite'
    database.deleteStorage()
    await database.init()
})

describe('All view propertys are working', () => {
    it('Dashboard.View.init()', async () => {
        // Database table view is created
        const hasTabel = await database.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='view'`)
        expect(hasTabel).toHaveProperty('name')
    })
    it('Dasboard.View.Add() works', async () => {
        // add device
        await database.dashboard.view.add('Test', 0)
        await database.dashboard.view.add('Test without timeout')

        const view = await database.dashboard.view.get(1)
        expect(view).toHaveProperty('name')
        expect(view).toHaveProperty('id')
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
    it('Dashboard.View.delete() works', async () => {
        const id = await database.dashboard.view.add('Test delete')
        const idSection = await database.dashboard.viewSection.add('Test', 'Test', id, "0,0,1,1")
        await database.dashboard.view.delete(1)
        const view = await database.dashboard.view.get(1)
        expect(view).toBe()
        const viewSection = await database.dashboard.viewSection.get(idSection)
        expect(viewSection).toBe()
    })
    it('Should join view and viewSection', async () => {
        // add view
        const viewId = await database.dashboard.view.add('join test')
        // add viewSection
        const viewSectionId = await database.dashboard.viewSection.add('join test', 'join test', viewId, "0,0,1,1")
        const viewSectionId2 = await database.dashboard.viewSection.add('join test2', 'join test', viewId, "0,0,1,1")

        const view = await database.dashboard.view.get(viewId, true)
        expect(view).toHaveProperty('viewSections')
        expect(view.viewSections).toBeInstanceOf(Array)
        expect(view.viewSections.length).toBeGreaterThanOrEqual(1)
        expect(view.viewSections[0]).toHaveProperty('id', viewSectionId)
        expect(view.viewSections[0]).toHaveProperty('name', 'join test')
        expect(view.viewSections[1]).toHaveProperty('id', viewSectionId2)
        expect(view.viewSections[1]).toHaveProperty('name', 'join test2')
    })
})


afterAll(async () => {
    await database.close()
    await database.deleteStorage()
})