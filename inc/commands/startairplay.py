from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound
import os


class myCommand(Command):

    COMMAND = '/startairplay'
    DESCRIPTION = 'Start een Airplay Server'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Airplay Server Starten")
        os.system("sudo systemctl start airplay")
