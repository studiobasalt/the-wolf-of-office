from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class Steekaan(Command):

    COMMAND = '/steekaan'

    def run(self, chat_id):
        self.bot.sendMessage(chat_id, "Steek aan dat ding!!!!!")
        PlaySound().play('steekaan.mp3')
