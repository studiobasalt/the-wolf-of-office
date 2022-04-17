#!/bin/bash

echo "-- Set startup script --"

# Set chromium behafior
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

# Create script dir
mkdir -p /home/pi/.config/lxsession/LXDE-pi/

# Copy template to user boot dir
cp /usr/bin/the-wolf-of-office/res/lxsession-autostart /home/pi/.config/lxsession/LXDE-pi/autostart

# Set ownership
chown pi:pi /home/pi/.config/lxsession/LXDE-pi/autostart
