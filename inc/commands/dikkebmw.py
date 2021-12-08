from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/dikkebmw'
    DESCRIPTION = 'DIKKE BMW'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "DIKKE BMW")
        PlaySound().play('dikkebmwsound.mp3')
