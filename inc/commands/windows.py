from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/windows'
    DESCRIPTION = 'Windows error song!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Windows error song!")
        PlaySound().play('windows.mp3')
