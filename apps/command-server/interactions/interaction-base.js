import slackConnector from '../inc/slackWebClient.js'
import playSound from '../inc/soundPlayer.js'
import classLoader from '../inc/classLoader.js';

class BaseInteraction{
    constructor(){
        this.action_id = ""; //Overwrite in extend
    }
    run(){
        throw new Error("Not implemented yet") // Overwrite in extend
    }
    async trigger(body){
        await this.setup(body)

        if(!this.testTrigger()){
            return false
        }

        this.setParseState()        
        // run the command
        await this.run()
        // signal that the interaction has been processed
        return true
    }

    async setup(body){
        this.body = body
        this.context = await classLoader.commands
        this.body.channel_id = this.body.channel.id
        this.body.user_id = this.body.user.id
        this.body.channel_name = this.body.channel.name
    }

    testTrigger(){
        // loop body.actions and match for each as action if action_id is not equal to this.action_id return false
        let actionFound = false;
        for(let action of this.body.actions){
            if(action.action_id === this.action_id){
                actionFound = true;
                break;
            }
        }
        if(!actionFound){
            return false
        }
        return true
    }

    // parse all values in body.state
    setParseState(){
        const state = this.body.view?.state.values;
        let parsedState = {};
        for(let key in state){
            for(let key2 in state[key]){
                parsedState[key2] = state[key][key2];
            }
        }
        this.state = parsedState;
    }

    async say(message, blocks, hiddenMessage){
        await slackConnector.say(message, this.body, blocks, hiddenMessage)
    }

    async openView(view){
        await slackConnector.openView(view, this.body)
    }

    async play(file) {
        await playSound(file)
    }

    async proxyCommand(name){
        // loop every command in classLoader.commands and match for each as command if command.name is equal to name execute command.run
        for(let index in this.context){
            const command = this.context[index];
            if(command.name === name){
                await command.trigger(this.body, this.context, true)
                return
            }
        }
    }
}

export default BaseInteraction;