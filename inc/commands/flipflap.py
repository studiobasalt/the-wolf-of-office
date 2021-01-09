from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/flipflap'
    DESCRIPTION = 'This is almost the best song in the world!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Flipflap a niffoooo")
        PlaySound().play('flipflap.mp3')
