import { SocketModeClient } from '@slack/socket-mode'
import env from '../../lib/load-env.js'

// Import events for the client
// import NewMember from './socket-events/new-member.js'
// import IsOnline from './socket-events/is-online.js'
// import Mention from './socket-events/mention.js'
import Interactive from './socket-events/interactive.js'
import CommandsEvent from './socket-events/commandsEvent.js'

// Construct socket en api
const appToken = env.SLACK_APP_TOKEN
const socketClient = new SocketModeClient({appToken});

console.log("Wolf is starting a slack websocket :)")

// Start to listen over a websocket to slack
await socketClient.start();

// Construct every event
// new NewMember(socketClient)
// new IsOnline(socketClient)
// new Mention(socketClient)
new Interactive(socketClient)
new CommandsEvent(socketClient)
