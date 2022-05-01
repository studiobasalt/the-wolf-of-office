import Base from './base.js'

class Command extends Base{

    async init(){
        this.socket.on('slash_commands', async ({ body, ack }) => {
            try {
                if (body.command === "/wolf") {
                    console.log("UPDATE");
                    await this.test(body)
                }
                if (body.command === "/wolf-sys") {
                    await ack({"text": "Not build yet"})
                }
                if (body.command === "/wolf-dash") {
                    await ack({"text": "Not build yet"})
                }
                await ack()
            } catch (e) {
                await ack({"text": e})
            }
        });
    }

    async processWolfCommands(body){
        await this.webClient.chat.postMessage({
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Test command, <@${body.user_name}>.`,
              }
            },
          ],
          channel: body.channel_id,
        });
    }
}

export default Command
