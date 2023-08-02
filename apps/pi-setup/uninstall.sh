#!/bin/bash

cd /usr/bin/the-wolf-of-office

echo '-- Start Uninstall --'

apt purge -y raspberrypi-ui-mods
apt purge -y unclutter
apt purge realvnc-vnc-server -y
raspi-config nonint do_vnc 1
rm /home/pi/.config/lxsession/LXDE-pi/autostart

bash ./bin/inc/system/update.sh

rm /usr/bin/the-wolf-of-office -rf
echo '-- Uninstalled --'
