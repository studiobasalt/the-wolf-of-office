import { SocketModeClient } from '@slack/socket-mode'
import env from '../../lib/load-env.js'
import db from '../../lib/db.js'

// Import events for the client
import Interactive from './socket-events/interactive.js'
import CommandsEvent from './socket-events/commandsEvent.js'

// Construct socket en api
const appToken = env.SLACK_APP_TOKEN
const socketClient = new SocketModeClient({appToken});

console.log("Wolf is starting a slack websocket :)")

// Start to listen over a websocket to slack
await socketClient.start();

// Construct every socket event
new Interactive(socketClient)
new CommandsEvent(socketClient)

// Setup database
await db.init()
db.dashboard.device.add(env.DEVICE_NAME)