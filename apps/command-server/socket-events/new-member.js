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
        // trigger msg
    }
}

export default NewMember
