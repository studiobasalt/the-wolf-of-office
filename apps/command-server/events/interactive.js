import Base from './base.js'
import classLoader from '../inc/classLoader.js'

class Interactive extends Base{
    async init(){
        // Set interactions in scope
        this.interactions = await classLoader.interactions

        // listen to interactive events
        this.socket.on('interactive', async ({ body, ack }) => {
            try {
                await this.processInteractions(body)
            } catch (e) {
                console.log(e);
                await ack({text: 'Huston we have an problem' + e});
            }
            await ack();
        });
    }

    // loop this.interactions as interaction and run trigger on each
    async processInteractions(body){
        for(let index in this.interactions){
            const interaction = this.interactions[index]
            await interaction.trigger(body)
        }
    }
}

export default Interactive
