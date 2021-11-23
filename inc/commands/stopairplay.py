from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound
import os


class myCommand(Command):

    COMMAND = '/stopairplay'
    DESCRIPTION = 'Stopt de Airplay Server'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Airplay Server Stoppen")
        os.system("sudo systemctl stop airplay")