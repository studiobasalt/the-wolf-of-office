from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/hahabier'
    DESCRIPTION = 'Haha bier'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Tijd voor bierrrrrr")
        PlaySound().play('hahabier.mp3')
