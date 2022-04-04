#!/bin/bash

echo '-- Install pip (python3) libs --'

pip3 install importlib
pip3 install pygame
pip3 install tinydb
pip3 install flask
pip3 install python-dotenv

echo '-- Install os packages --'

apt install -y raspberrypi-ui-mods chromium-browser
apt install -y unclutter
