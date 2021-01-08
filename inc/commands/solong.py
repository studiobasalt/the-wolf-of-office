from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/solong'
    DESCRIPTION = 'Solong gayboyssss'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Solong gayboyssss")
        PlaySound().play('solong.mp3')
