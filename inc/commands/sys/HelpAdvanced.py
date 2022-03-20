from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound


class myCommand(Command):

    COMMAND = '/helpadvanced'
    DESCRIPTION = 'Show all advanced commands'

    def run(self, data):
        output = ""
        for command in data['wolfBot'].commands:
            if not command.SIMPLE_COMMAND:
                output += command.COMMAND + " - " + command.DESCRIPTION + '\r\n'
        self.bot.sendMessage(data['chat_id'], output)
