import Base from './base.js'

class IsOnline extends Base{
    init(){
        this.socket.on('connected', () => {
            console.log('Slack bot is online!');
        });
    }
}

export default IsOnline
