

class Command():

    SIMPLE_COMMAND = True

    def __init__(self, wolfBot):
        self.bot = wolfBot.bot
        if self.COMMAND:
            print('Loaded: ' + self.COMMAND)
            pass
        if self.DESCRIPTION:
            pass
        if self.run:
            pass

    def getName(self):
        return self.COMMAND
