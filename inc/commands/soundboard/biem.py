from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/biem'
    DESCRIPTION = 'BIEM MENEER'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "BIEM MENEER!!")
        PlaySound().play('BIEM.mp3')
