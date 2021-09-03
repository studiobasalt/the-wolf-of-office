from inc.classes.Command import Command
from inc.classes.Browser import Browser


class myCommand(Command):

    COMMAND = '/bitcoin'
    DESCRIPTION = 'Shows Bitcoin webcam on the television'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Bitcoin beeld wordt aangezet!")
        Browser().goToUrl("https://tradingview.com/chart/npy5tWBI")