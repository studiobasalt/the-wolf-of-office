import { SocketModeClient } from '@slack/socket-mode'
import env from '../../lib/load-env.js'

// Import events for the client
import NewMember from './events/new-member.js'
import IsOnline from './events/is-online.js'
import Mention from './events/mention.js'
import Interactive from './events/interactive.js'
import CommandsEvent from './events/commandsEvent.js'

// Construct socket en api
const appToken = env.SLACK_APP_TOKEN
const socketClient = new SocketModeClient({
    appToken,
    // logLevel: LogLevel.DEBUG
});


(async () => {
    console.log("Wolf is starting a slack websocket :)")

    // Start to listen over a websocket to slack
    await socketClient.start();

    // Construct every event
    // new NewMember(socketClient)
    // new IsOnline(socketClient)
    // new Mention(socketClient)
    // new Interactive(socketClient)
    new CommandsEvent(socketClient)
})();
