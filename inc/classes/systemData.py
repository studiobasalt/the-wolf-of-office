from inc.classes.database import db
import os
from dotenv import load_dotenv

class SystemData():

    def __init__(self):
        self.system = lambda: None
        self.system.dashboard = lambda: None
        self.loadEnv()
        self.setupDashboardData()
        self.setupDatabase()

    def loadEnv(self):
        load_dotenv()
        self.envData = os.environ

    def env(self, key):
        if key in self.envData.keys():
            return self.envData[key]
        else:
            return False

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

print(systemData)
