from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound
import os, random

class myCommand(Command):

    COMMAND = '/sloopkogel'
    DESCRIPTION = 'Random geluid van Lorenzo AKA Sloopkogel'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Random geluid van Lorenzo AKA Sloopkogel")
        PlaySound().play("sloopkogel/" + random.choice(os.listdir("./sounds/sloopkogel")))
