import sys
import os


current = os.path.dirname(os.path.realpath(__file__))

sys.path.insert(0, os.path.abspath(current + '/../../inc/classes/'))

from systemData import systemData

systemData.db.options.add('dashboard_template', '01')
