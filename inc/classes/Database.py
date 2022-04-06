from tinydb import TinyDB, Query
from tinydb.operations import set

from os.path import exists
from io import open

class DB():

    dbFile = 'res/db.json'

    def __init__(self):
        self.db  = TinyDB(self.dbFile)
        self.options = Table(self.db, 'options')
        self.data = Table(self.db, 'data')
        self.bootMe()

    def bootMe(self):
        self.options.add('init', True)

class Table():
    def __init__(self, db, tableName):
        self.tableName = tableName
        self.db = db
        self.table = db.table(tableName)
        self.query = Query()

    def add(self, name, value=''):
        self.table.upsert({'name' : name , 'value' : value}, self.query.name == name)

    def get(self, name):
        result = self.table.search(self.query.name == name)
        if not result:
            return
        return result[0]['value']

db=DB()
