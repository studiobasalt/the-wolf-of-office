import Base from './base.js'

class Mention extends Base{
    init(){
        this.socket.on('app_mention', async ({ event }) => {
            // console.log(event);
        });
    }
}

export default Mention
