import Base from './base.js'

class Interactive extends Base{
    init(){
        this.socket.on('interactive', async ({ body, ack }) => {
            try {
                console.log(JSON.stringify(body))
            } catch (e) {
                console.log(e);
                await ack(e);
            }
            await ack();
        });
    }

}

export default Interactive
