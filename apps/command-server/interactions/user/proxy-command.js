import BaseInteraction from "../interaction-base.js";

class ProxyCommand extends BaseInteraction{
    constructor(){
        super();
        this.action_id = "proxy-command";
    }
    async run(){
        const commandName = this.body.actions[0].value;
        await this.proxyCommand(commandName);
    }
}

export default ProxyCommand;