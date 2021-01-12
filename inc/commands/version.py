from inc.classes.Command import Command
from os import path

class myCommand(Command): # Don't change this!

    COMMAND = '/version'
    DESCRIPTION = 'Get current version of the server'
    SIMPLE_COMMAND = False # Default is true

    def run(self, data):
        with open('.version') as f: version = f.read()
        self.bot.sendMessage(data['chat_id'], "Server version: " + version)
        f.close()
