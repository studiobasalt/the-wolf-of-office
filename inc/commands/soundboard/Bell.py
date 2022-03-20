from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/bell'
    DESCRIPTION = 'Ring the bell for a sale!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Stonks!!")
        PlaySound().play('bell.mp3')
