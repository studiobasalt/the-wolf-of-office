#from playsound import playsound
from os import path
from pygame import mixer

class PlaySound:

    def getFilePath(self, fileName):
        basepath = path.dirname(__file__)
        return path.abspath(path.join(basepath, "..", "..", "sounds", fileName))


    def play(self, fileName):
        #playsound(self.getFilePath(fileName))
        mixer.init()
        mixer.music.load(self.getFilePath(fileName))
        mixer.music.play()
