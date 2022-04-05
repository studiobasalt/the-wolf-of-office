#!/bin/bash

cd /usr/bin/the-wolf-of-office

pip3 uninstall importlib
pip3 uninstall pygame
pip3 uninstall tinydb
pip3 uninstall flask
pip3 uninstall python-dotenv
apt purge -y raspberrypi-ui-mods chromium-browser
apt purge -y unclutter
mv ./res/teleport.yaml /etc/
apt-get purge realvnc-vnc-server
raspi-config nonint do_vnc 1
apt purge novnc -y
rm /home/pi/.config/lxsession/LXDE-pi/autostart

bash ./bin/inc/system/update.sh

rm /usr/bin/the-wolf-of-office -rf
echo '-- Uninstalled --'
