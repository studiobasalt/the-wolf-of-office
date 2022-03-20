# coding: utf-8
from flask import Flask, render_template


class Dashboard():

    def __init__(self):
        if not env.DASHBOARD:
            return
        self.app = Flask("__main__", template_folder='../dashboards')
        self.routes()
        app.run(host='0.0.0.0', debug=!env.IS_PRODUCTION)

    def routes(self):
        self.routeHome()
        self.routeDashboard()

    def template(self, name):
        self.data.template = name
        return render_template('template.html', self.data)

    def routeHome(self):
        @app.route('/')
        def index():
            return template()
        def template():
            return render_template('example.html')


    def routeDashboard(self):
        @app.route('/dashboard/<dashboard>', strict_slashes=False)
        @app.route('/dashboard>', strict_slashes=False)
        def index(dashboard=False):
            if not dashboard:
                return this.homeRoute.template()
            return template()
        def template():
            return render_template('dashboard/' + dashboard)
