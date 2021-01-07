from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/steekaan'
    DESCRIPTION = 'Steek aan dat ding!!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Steek aan dat ding!!!!!")
        PlaySound().play('steekaan.mp3')
