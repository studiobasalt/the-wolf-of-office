import Base from './base.js'
import appRoot from 'app-root-path'
import fs from 'fs'

class Interactive extends Base{
    async init(){
        this.interactions = await this.import()
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

    listFiles() {
        let dir = appRoot + '/apps/command-server/interactions/user/';
        let files = fs.readdirSync(dir);
        let jsFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].endsWith('.js')) {
                jsFiles.push(dir + files[i]);
            }
        }
        return jsFiles;
    }

    async import(){
        const files = this.listFiles()
        const intractions = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            let interaction = false;
            const module = await import(file).then((module) => {
                interaction = module.default;
            })
            intractions.push(new interaction())
        }
        return intractions
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
