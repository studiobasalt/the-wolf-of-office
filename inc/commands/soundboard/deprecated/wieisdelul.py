from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound
import os, time, random

names = ["Derrin", "Lorenzo", "Matthijs", "Stefan", "Sofie", "Jaap", "Sieb", "Sander", "Boris", "Laurence"]

class myCommand(Command):

    COMMAND = '/wieisdelul'
    DESCRIPTION = 'Wie zal het zijn?!'

    def run(self, data):
        self.bot.sendMessage(data['chat_id'], "Rara!")
        speech("5")
        time.sleep(0.7)
        speech("4")
        time.sleep(0.7)
        speech("3")
        time.sleep(0.7)
        speech("2")
        time.sleep(0.7)
        speech("1")
        time.sleep(0.7)

        name = random.choice(names)
        speech("De lullo is: " + name)

def speech(text):
    os.system("say " + text)