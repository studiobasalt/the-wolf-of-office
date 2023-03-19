import sound from 'sound-play'
import appRoot from 'app-root-path'

class SoundPlayer {
    constructor() {
        this.isPlaying = false
    }
    // play a sound file from the sounds folder
    async play(file, fullPath = false) {
        // if the sound is already playing, stop it
        if(this.isPlaying) {
            throw new Error("Sound is already playing")
        }
        this.isPlaying = true
        // if the file is not provided, use the default file
        const soundsFolder = appRoot + '/res/sounds/'
        const soundFile = fullPath ? fullPath : soundsFolder + file
        // play the sound
        try {
            await sound.play(soundFile)
        } catch (e) {
            throw new Error(`Could not play sound file ${soundFile}`)
        }
        // set the sound to not playing
        this.isPlaying = false
    }
}

const player = new SoundPlayer()

async function play(file, fullPath = false){
    await player.play(file, fullPath)
}

export default play