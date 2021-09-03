import os, platform

class Browser():

    def goToUrl(self, url):
        if(platform.system() == "Linux"):
            os.system("pkill -o chromium-")
            os.system("-u pi DISPLAY=:0.0 chromium-browser --kiosk "+ str(url) +" &")
        elif(platform.system() == "Darwin"):
            os.system("pkill -o Chromium")
            os.system("DISPLAY=:0.0 chromium --kiosk "+ str(url) +" &")

help=Browser()