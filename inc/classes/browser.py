import os, platform

class Browser():

    def init():
        # start browser

    def url(self, url):
        if(platform.system() == "Linux"):
            os.system("pkill -o chromium-")
            os.system("sudo -u pi DISPLAY=:0.0 chromium-browser --kiosk "+ str(url) +" &")
        elif(platform.system() == "Darwin"):
            os.system("pkill -o Chromium")
            os.system("DISPLAY=:0.0 chromium --kiosk "+ str(url) +" &")

    def reload():
        # reload

help=Browser()
