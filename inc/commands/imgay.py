from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/imgay'
    DESCRIPTION = 'Im gay sound'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Are you gay?")
        PlaySound().play('imgay.mp3')
