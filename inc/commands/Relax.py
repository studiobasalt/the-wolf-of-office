from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class Relax(Command):

    COMMAND = '/relax'

    def run(self, chat_id):
        PlaySound().play('chestbeat.mp3')
