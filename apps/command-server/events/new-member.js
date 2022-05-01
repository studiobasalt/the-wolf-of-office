import Base from './base.js'

class NewMember extends Base{
    init(){
        this.socket.on('member_joined_channel', async ({event, body, ack}) => {
            try {
              await ack();
              await this.sendWelcome(event)
            } catch (error) {
              console.log('Welcome message:', error);
            }
          });
    }

    async sendWelcome(event){
        await this.webClient.chat.postMessage({
            blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Welkom <@${event.user}> in het kanaal. Met mij kan je de dashboards hier bedienen. Klik op help om alle commands te zien of gebruik: "/wolf help."`,
              },
              accessory: {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Help',
                },
                value: 'get_help',
              },
            },
          ],
          channel: event.channel,
        });
    }
}

export default NewMember
