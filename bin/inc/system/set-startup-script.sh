#!/bin/bash

echo "-- Set startup script --"

mkdir -p /home/pi/.config/lxsession/LXDE-pi/

cp /usr/bin/the-wolf-of-office/res/lxsession-autostart /home/pi/.config/lxsession/LXDE-pi/autostart
