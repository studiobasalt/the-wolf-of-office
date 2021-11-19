from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/boos'
    DESCRIPTION = 'Ben je echt zo boos?'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Ben je echt zo boos?")
        PlaySound().play('benjeechtzoboos.mp3')