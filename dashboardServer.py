# coding: utf-8
from flask import Flask, render_template
from inc.classes.systemData import systemData
import os
from requests import get


template_dir = os.path.abspath('./inc/dashboards/')
static_dir = os.path.abspath('./inc/dashboards/assets')
app = Flask(
    "__main__",
    template_folder=template_dir,
    static_folder=static_dir,
    static_url_path="/static",
)


@app.route('/', strict_slashes=False)
def index():
    return render_template('index.html', data=systemData)
