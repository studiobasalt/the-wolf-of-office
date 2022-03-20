from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/pindakaas'
    DESCRIPTION = 'Lekker'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Lekkere pinkakaas")
        PlaySound().play('pindakaas.mp3')
