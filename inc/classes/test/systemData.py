from ..systemData import systemData


class Tester():

    def __init__(self):
        self.passTest = True
        self.env()

    def env(self):
        if not systemData.env('DEVICE_NAME'):
            print('Check your .env file, DEVICE_NAME not set!')
            self.passTest = False
        else:
            print(systemData.env('DEVICE_NAME'))



dataPass = Tester().passTest
