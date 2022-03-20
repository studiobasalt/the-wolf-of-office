from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/relax'
    DESCRIPTION = 'McConaughey chest beat'

    def run(self, data):
        PlaySound().play('chestbeat.mp3')
