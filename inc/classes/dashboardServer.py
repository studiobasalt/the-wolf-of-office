# coding: utf-8
from flask import Flask, render_template
from systemData import systemData

if not systemData.env("DASHBOARD_SERVER"):
    exit()

app = Flask("__main__", template_folder='../dashboards/')
# app.run(host='0.0.0.0')

@app.route('/')
def index():
    return "<p>Hello, World!</p>"
    # return render_template('home.html')


# @app.route('/dashboard/<dashboard>', strict_slashes=False)
# @app.route('/dashboard>', strict_slashes=False)
# def routeDashboard(dashboard=False):
#     if not dashboard:
#         return this.homeRoute.template()
#     return render_template('dashboard/' + dashboard)
