#!/bin/bash

cd /usr/bin/the-wolf-of-office/apps/pi-setup/

bash ./inc/system/disable-wifi-sleep.sh
bash ./inc/system/setScreenOrientation.sh

cd /usr/bin/the-wolf-of-office/apps/kiosk-app/
sudo -u volcano bash -c 'export DISPLAY=:0 && yarn dev'