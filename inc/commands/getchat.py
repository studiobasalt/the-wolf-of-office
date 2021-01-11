from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command): # Don't change this!

    COMMAND = '/getchat'
    DESCRIPTION = 'Get all the chat info in the terminal'
    SIMPLE_COMMAND = False # Default is true

    def run(self, data):
        print('==============')
        print(self.bot.getChat(data['chat_id']))
        print('==============')
