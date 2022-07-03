import db from '../lib/db/index.js'
import env from '../lib/load-env.js'

await db.init()

// Add view
const viewId = await db.dashboard.view.add('Test')
const viewId2 = await db.dashboard.view.add('Test2')
const viewId3 = await db.dashboard.view.add('Test3')

// register device in database
await db.dashboard.device.add(env.DEVICE_NAME, [viewId,viewId2].join(','))
await db.dashboard.device.add("Device 2", [viewId3].join(','))

// Add viewSections
await db.dashboard.viewSection.add('Google', 'https://google.com', viewId, "0,0,100,50")
await db.dashboard.viewSection.add('Youtube', 'https://youtube.com', viewId, "0,50,100,50")
await db.dashboard.viewSection.add('Bing', 'https://bing.com', viewId2, "0,0,100,100")
await db.dashboard.viewSection.add('clickup', 'https://clickup.com', viewId3, "0,0,100,100")