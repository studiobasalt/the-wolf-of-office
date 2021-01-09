import telepot
import time
from telepot.loop import MessageLoop
import os
import importlib
import sys

class WolfBot():

    commands = []

    def __init__(self, config):
        self.config = config
        self.loadBot()
        self.autoLoadCommands()
        self.testBot()

    def getToken(self):
        def getFilePath():
            basepath = os.path.dirname(__file__)
            return os.path.abspath(os.path.join(basepath, "..", "..", ".token"))
        def getTokenFromFile():
            tokenFile = False
            try:
                tokenFile = open(getFilePath(), 'r')
                with tokenFile as file:
                    return file.read().replace('\n', '')
            except IOError:
                print("ERROR: No .token file found. Past your Telegram bots API token in a .token file")
                sys.exit()
            finally:
                if tokenFile:
                    tokenFile.close()

        return getTokenFromFile()

    def loadBot(self):
        self.bot = telepot.Bot(self.getToken())

    def testBot(self):
        try:
            me = self.bot.getMe()
            if me['id']:
                pass
        except Exception as e:
            print(e)
            print("ERROR: Telegram bot is not connecting. Is your token correct? Do you have internet?")
            sys.exit()

    def getCommandNames(self):
        nameList = []
        for file in os.listdir("inc/commands"):
            if file.endswith(".py"):
                nameList.append(file.replace('.py', ''))
        return nameList

    def autoLoadCommands(self):

        for commandName in self.getCommandNames():
            self.importCommand(commandName)
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
