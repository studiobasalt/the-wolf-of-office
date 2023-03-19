import {describe, it, expect, beforeAll, afterAll} from 'vitest'
import appRoot from 'app-root-path'
import database from '../index.js'

beforeAll(async () => {
    database.file = appRoot + '/res/db.dashboard.test.sqlite'
    database.deleteStorage()
    await database.init()
})

describe('database.Dashboard is a class and contain main propertys', () => {
    it('Its a class', () => {
        expect(database.dashboard.db).toBeInstanceOf(Object)
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
    it('Has a property viewSection an is a object', () => {
        expect(database.dashboard).toHaveProperty('viewSection')
        expect(database.dashboard.viewSection).toBeInstanceOf(Object)
    })
})

afterAll(async () => {
    await database.close()
    await database.deleteStorage()
})
