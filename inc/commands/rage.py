from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/rage'
    DESCRIPTION = 'Royalistiq rage'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Royalistiq rage")
        PlaySound().play('rage.mp3')
