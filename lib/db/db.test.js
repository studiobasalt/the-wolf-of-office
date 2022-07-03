import database from './index.js'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import appRoot from 'app-root-path'
import fs from 'fs'

beforeAll(async () => {
    database.file = appRoot + '/res/db.test.sqlite'
    database.deleteStorage()
    await database.init()
})

describe("Database init done", () => {
    it("should create the database", async () => {
        expect(database.db).toBeDefined()
    })
    it("Should not create the database twice", async () => {
        const initResponse = await database.init()
        expect(initResponse).toBe(false)
    })
})

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

describe("teardown of db", async () => {
    it('Clear the database and no tables in the database', async () => {
        await database.removeAllTabels()
        const hasTabel = await database.db.get(`SELECT name FROM sqlite_master WHERE type='table'`)
        expect(hasTabel).toBeUndefined()
    })
    it('Sould removed the database file', async () => {
        await database.deleteStorage()
        expect(fs.existsSync(database.file)).toBe(false)
    })
    it('Should not crach if database is removed again', async () => {
        await database.deleteStorage()
    })
})