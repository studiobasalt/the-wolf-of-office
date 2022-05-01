class Base{
    constructor(socketModeClient, webClient){
        this.socket = socketModeClient
        this.webClient = webClient
        this.init()
    }
}

export default Base
