from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class Bell(Command):

    COMMAND = '/bell'

    def run(self, chat_id):
        self.bot.sendMessage(chat_id, "Stonks!!")
        PlaySound().play('bell.mp3')
