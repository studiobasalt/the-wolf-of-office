from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/altijdherres'
    DESCRIPTION = 'Royalistiq herres'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Royalistiq herres")
        PlaySound().play('altijdherres.mp3')
