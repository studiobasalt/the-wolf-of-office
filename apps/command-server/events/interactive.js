import Base from './base.js'

class Interactive extends Base{
    init(){
        this.socket.on('interactive', async ({ body, ack }) => {
            console.log(body);
          // if (body.callback_id === "get_help") {
            // handle the shortcut here
            await this.webClient.views.open({
              trigger_id: body.trigger_id,
              view: {
                type: "modal",
                title: {
                  type: "plain_text",
                  text: "My App"
                },
                close: {
                  type: "plain_text",
                  text: "Close"
                },
                blocks: [
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: "Hi there!"
                    }
                  }
                ]
              }
            });
          // }
        await ack();
        });
    }
}

export default Interactive
