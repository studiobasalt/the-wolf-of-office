import Base from './base.js'
// import soundBoardModal from '../formats/slack-modals/soundboard.js'


class Interactive extends Base{
    init(){
        this.socket.on('interactive', async ({ body, ack }) => {
            try {
                this.handelMe(body)
                await ack();
            } catch (e) {
                console.log(e);
            }
        });
    }

    getMap(){
        return {
            // open_soundboard : soundBoardModal,
            // get_help: soundBoardModal
        }
    }

    handelMe(body){
        const map = this.getMap()
        for (var key in map) {
            const handeler = map[key]
            if (body.trigger_id === key) { // CHECK ON ACTION
                handeler(this.webClient, body.trigger_id)
                break
            }
        }
    }
}

export default Interactive
