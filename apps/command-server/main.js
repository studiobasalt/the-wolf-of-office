import { SocketModeClient, LogLevel } from "@slack/socket-mode"
import { WebClient } from "@slack/web-api"
import env from "../../lib/load-env.js"

// Import events for the client
import NewMember from './events/new-member.js'
import IsOnline from './events/is-online.js'
import Mention from './events/mention.js'
import Interactive from './events/interactive.js'
import Command from './events/command.js'

// Construct socket en api
const appToken = env.SLACK_APP_TOKEN
const botToken = env.SLACK_BOT_TOKEN
const socketClient = new SocketModeClient({
    appToken,
    // logLevel: LogLevel.DEBUG
});
const webClient = new WebClient(process.env.SLACK_BOT_TOKEN);

(async () => {
    console.log("Wolf is starting a slack websocket :)")

    // Start to listen over a websocket to slack
    await socketClient.start();

    // Construct every event
    new NewMember(socketClient, webClient)
    new IsOnline(socketClient, webClient)
    new Mention(socketClient, webClient)
    new Interactive(socketClient, webClient)
    new Command(socketClient, webClient)
})();
