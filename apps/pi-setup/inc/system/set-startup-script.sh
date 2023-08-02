#!/bin/bash

echo "-- Set startup script --"

## MAKE USER DYNAMIC

# Create script dir
mkdir -p /home/volcano/.config/lxsession/LXDE-pi/

# Copy template to user boot dir
sudo cp /usr/bin/the-wolf-of-office/apps/pi-setup/inc/lxsession-autostart /home/volcano/.config/lxsession/LXDE-pi/autostart

# Set ownership
chown volcano:volcano /home/volcano/.config/lxsession/LXDE-pi/autostart
