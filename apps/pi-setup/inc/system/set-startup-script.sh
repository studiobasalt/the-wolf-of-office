#!/bin/bash

echo "-- Set startup script --"

# Create script dir
mkdir -p /home/pi/.config/lxsession/LXDE-pi/

# Copy template to user boot dir
cp /usr/bin/the-wolf-of-office/apps/pi-setup/lxsession-autostart /home/pi/.config/lxsession/LXDE-pi/autostart

# Set ownership
chown pi:pi /home/pi/.config/lxsession/LXDE-pi/autostart
