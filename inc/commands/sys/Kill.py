from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/kill'
    DESCRIPTION = 'Kill all sounds'

    def run(self, data):
        PlaySound().kill()
