from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/sporten'
    DESCRIPTION = 'Sportennnn!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Sportenn!")
        PlaySound().play('Sporten.mp3')
