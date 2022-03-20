from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/letsgo'
    DESCRIPTION = 'yeah, lets go'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "yeah, lets go")
        PlaySound().play('letsgo.mp3')
