#!/bin/bash

. /usr/bin/the-wolf-of-office/apps/pi-setup/inc/load-env-file.sh
sudo -u $USER_NAME DISPLAY=:0 xrandr --output HDMI-1 --auto