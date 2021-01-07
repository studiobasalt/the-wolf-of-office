from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command): # Don't change this!

    COMMAND = '/name'
    DESCRIPTION = 'NONE'
    # SIMPLE_COMMAND = True # Default is true

    def run(self, data):
        # Documentation for the Telegram bot API
        # https://telepot.readthedocs.io/en/latest/reference.html#telepot-helper

        # Send a msg
        self.bot.sendMessage(data['chat_id'], "Steek aan dat ding!!!!!")

        # Play a sound from the sounds folder
        PlaySound().play('steekaan.mp3')

        # Kill sound
        PlaySound().kill()
