from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/kopen'
    DESCRIPTION = 'Niet janken maar kopuunn!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Niet janken maar kopuunn!")
        PlaySound().play('bitcoinkopen.mp3')
