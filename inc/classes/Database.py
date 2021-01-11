from tinydb import TinyDB, Query


class DB():

    def __init__(self):
        self.db  = TinyDB('resources/db.json')
        self.options = Table(self.db, 'options')
        self.data = Table(self.db, 'data')
        self.users = Table(self.db, 'data')
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

help=DB()
