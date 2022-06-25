import slackConnector from '../inc/slackWebClient.js'
import playSound from '../inc/soundPlayer.js'

class BaseInteraction{
    constructor(){
        this.action_id = ""; //Overwrite in extend
    }
    run(){
        throw new Error("Not implemented yet") // Overwrite in extend
    }
    async trigger(body){
        this.body = body
        // loop body.actions and match for each as action if action_id is not equal to this.action_id return false
        let actionFound = false;
        for(let action of body.actions){
            if(action.action_id === this.action_id){
                actionFound = true;
                break;
            }
        }
        if(!actionFound){
            return
        }
        this.setParseState()        
        // run the command
        await this.run()
        // signal that the interaction has been processed
        return true
    }

    // parse all values in body.state
    setParseState(){
        const state = this.body.view.state.values;
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

    proxyCommand(name){
        throw new Error("Not implemented yet")
    }
}

export default BaseInteraction;