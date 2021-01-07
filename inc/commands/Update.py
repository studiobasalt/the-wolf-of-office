from inc.classes.Command import Command
from inc.classes.PlaySound import PlaySound
import os
import sys
import time

class myCommand(Command):

    COMMAND = '/update'
    DESCRIPTION = 'Update and reload server to latest version'
    SIMPLE_COMMAND = False

    def getMainPath(self):
            basepath = os.path.dirname(__file__)
            return os.path.abspath(os.path.join(basepath, "..", "..", 'theWolf.py'))

    def run(self, data):
        time.sleep(1)
        os.execl(sys.executable, 'python', self.getMainPath())
        time.sleep(1)
        data['wolfBot'].status = False;
