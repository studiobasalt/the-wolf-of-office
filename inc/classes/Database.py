from tinydb import TinyDB, Query
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
        self.options.add('init')

class Table():
    def __init__(self, db, tableName):
        self.tableName = tableName
        self.db = db
        self.table = db.table(tableName)
        self.query = Query()
    def add(self, name, value=''):
        obj = {name : value}
        if self.get(name):
            self.table.update(obj)
            return
        self.table.insert(obj)
    def get(self, name):
        return self.table.search(self.query[name].any)

db=DB()
