#!/bin/bash

cd /usr/bin/the-wolf-of-office

echo '-- Start Uninstall --'

pip3 uninstall importlib -y
pip3 uninstall pygame -y
pip3 uninstall tinydb -y
pip3 uninstall flask -y
pip3 uninstall python-dotenv -y
apt purge -y raspberrypi-ui-mods chromium-browser
apt purge -y unclutter
mv ./res/teleport.yaml /etc/
apt purge realvnc-vnc-server -y
raspi-config nonint do_vnc 1
rm /usr/share/novnc/index.html
apt purge novnc -y
rm /home/pi/.config/lxsession/LXDE-pi/autostart

bash ./bin/inc/system/update.sh

rm /usr/bin/the-wolf-of-office -rf
echo '-- Uninstalled --'
