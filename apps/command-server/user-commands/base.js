import db from '../../../lib/db.js'
import User from '../inc/user.js'
import Channel from '../inc/channel.js'

class Command{
    constructor(){

    }
    testTrigger(body){
        if (body.command === "/wolf") {
            console.log("UPDATE");
            await this.test(body)
        }
    }
    testPremission(body){
        const user = body.user //CHECK
        const channel = body.channel //CHECK


    }
}
