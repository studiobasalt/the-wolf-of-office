from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/phone'
    DESCRIPTION = 'samsjong'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "samsjong!!")
        PlaySound().play('samsung_skyline.mp3')
