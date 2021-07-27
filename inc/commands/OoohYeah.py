from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/ooohyeah'
    DESCRIPTION = 'OOOOOOHH YEAHHHH!! 8===>'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "oh yeah")
        PlaySound().play('OoohYeah.mp3')
