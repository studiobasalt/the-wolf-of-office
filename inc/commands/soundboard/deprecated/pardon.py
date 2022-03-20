from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/pardon'
    DESCRIPTION = 'PARDON, Doe normaal!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "PARDON, Doe normaal!")
        PlaySound().play('pardon.mp3')
