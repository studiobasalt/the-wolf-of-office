from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/lunch'
    DESCRIPTION = 'LUNCHH!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "LUNCHH!")
        PlaySound().play('Lunch.mp3')
