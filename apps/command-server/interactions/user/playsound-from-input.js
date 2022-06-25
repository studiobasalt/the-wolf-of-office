import InteractionBase from '../interaction-base.js';
import soundRegistrations from '../../../../res/sound-registration.js';

class PlayFromInputAction extends InteractionBase{
    constructor(){
        super()
        this.action_id = "playsound_from_input";
    }
    async run(){
        const file = this.getSoundFile()
        if (!file) {
            throw new Error("No sound file found")
        }
        await this.play(file, true)
    }
    parseInput(){
        // loop state as key and value and key equal to playsound_input
        for(let key in this.state){
            if(key === "playsound_input"){
                return this.state[key].selected_option.value
            }
        }
    }
    // Match selected option value against soundregeistraionts and return the soundfile
    getSoundFile(){
        const selectedOptionValue = this.parseInput()
        for(let soundRegistration of soundRegistrations){
            if(soundRegistration.name === selectedOptionValue){
                return soundRegistration.file
            }
        }
    }
        
}

export default PlayFromInputAction