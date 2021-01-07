import telepot
import time
from telepot.loop import MessageLoop
import os
import importlib


class WolfBot():

    commands = []

    def __init__(self, config):
        self.config = config
        self.loadBot()
        self.autoLoadCommands()

    def getToken(self):
        def getFilePath():
            basepath = os.path.dirname(__file__)
            return os.path.abspath(os.path.join(basepath, "..", "..", ".token"))
        def getTokenFromFile():
            with open(getFilePath(), 'r') as file:
                return file.read().replace('\n', '')

        return getTokenFromFile()

    def loadBot(self):
        self.bot = telepot.Bot(self.getToken())

    def testBot(self):
        print(self.bot.getMe())

    def autoLoadCommands(self):
        for commandName in self.config['loadCommands']:
            self.importCommand(commandName)
            pass

    def reloadCommands(self):
        pass

    def importCommand(self, commandName):
        module = importlib.import_module('inc.commands.' + commandName)
        command = getattr(module, 'myCommand')
        self.commands.append(command(self))

    def run(self):
        MessageLoop(self.bot, self.messageHandeler).run_as_thread()
        print('The 🐺 of office is listening!!!')
        self.status = True
        while self.status:
            time.sleep(1)
        print('The 🐺 is sleeping')

    def messageHandeler(self, msg):

        chat_id = msg['chat']['id']
        myCommand = msg['text']

        if self.config['debug']:
            print(msg)

        for command in self.commands:
            if command.getName() == myCommand:
                command.run({
                    'chat_id' : chat_id,
                    'wolfBot' : self
                })
                break
