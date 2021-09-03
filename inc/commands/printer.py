from inc.classes.Command import Command
from inc.classes.Browser import Browser


class myCommand(Command):

    COMMAND = '/printer'
    DESCRIPTION = 'Shows OctoPrint webcam on the television'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Printer beeld wordt aangezet!")
        Browser().goToUrl("http://octopi.local/webcam/?action=stream")