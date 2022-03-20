from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/ohmygod'
    DESCRIPTION = 'Oh my god, like, what the fuck'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "omg")
        PlaySound().play('ohmygod.mp3')
