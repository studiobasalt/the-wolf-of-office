from database import db
import os
from dotenv import load_dotenv

class SystemData():

    def __init__(self):
        self.system = lambda: None
        self.system.dashboard = lambda: None
        self.loadEnv()
        self.setupDashboardData()
        self.setupDatabase()
        self.setSystem()
        self.setSoftwareVersion()

    def loadEnv(self):
        load_dotenv()
        self.envData = os.environ

    def env(self, key):
        if key in self.envData.keys():
            value = self.envData[key]
        else:
            value = False

        #parse boolean
        if value == "False":
            return False
        if value == "True":
            return True
        return value


    def setSystem(self):
        self.system.device = self.env('DEVICE_NAME')

    def setSoftwareVersion(self):
        with open('.version') as f: version = f.read()
        self.system.version = version

    def setupDashboardData(self):
        def screens():
            return []
        def widgets():
            return []
        self.system.dashboard.screens = screens()
        self.system.dashboard.widgets = widgets()

    def setupDatabase(self):
        self.db = db


systemData = SystemData()
