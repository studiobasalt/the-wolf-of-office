import telepot
import time
from telepot.loop import MessageLoop
from os import path

class WolfBot():

    commands = []

    def __init__(self):
        self.loadBot()

    def getToken(self):
        def getFilePath():
            basepath = path.dirname(__file__)
            return path.abspath(path.join(basepath, "..", "..", ".token"))
        def getTokenFromFile():
            with open(getFilePath(), 'r') as file:
                return file.read().replace('\n', '')

        return getTokenFromFile()

    def loadBot(self):
        self.bot = telepot.Bot(self.getToken())

    def testBot(self):
        print(self.bot.getMe())

    def importCommand(self, command):
        self.commands.append(command(self.bot))

    def run(self):
        MessageLoop(self.bot, self.messageHandeler).run_as_thread()
        print('The 🐺 of office is listening!!!')
        while 1:
            time.sleep(10)

    def messageHandeler(self, msg):
        chat_id = msg['chat']['id']
        myCommand = msg['text']

        for command in self.commands:
            if command.getName() == myCommand:
                command.run(chat_id)
                break
