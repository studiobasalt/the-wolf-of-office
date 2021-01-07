import os
os.environ['PYGAME_HIDE_SUPPORT_PROMPT'] = "1"
from pygame import mixer



class PlaySound:

    def getFilePath(self, fileName):
        basepath = os.path.dirname(__file__)
        return os.path.abspath(os.path.join(basepath, "..", "..", "sounds", fileName))


    def play(self, fileName):
        mixer.init()
        mixer.music.load(self.getFilePath(fileName))
        mixer.music.play()

    def kill(self):
        mixer.init();
        mixer.music.load(self.getFilePath('bell.mp3'))
        mixer.music.play()
        mixer.music.stop()
