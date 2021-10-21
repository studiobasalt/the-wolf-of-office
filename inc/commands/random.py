from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound

class myCommand(Command):

    COMMAND = '/random'
    DESCRIPTION = 'Plays a random sound'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "random!!")
        PlaySound().play(random.choice(os.listdir("./sounds")))
