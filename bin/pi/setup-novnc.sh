#!/bin/bash

# enable and setup VNC service
sudo apt-get install realvnc-vnc-server
sudo raspi-config nonint do_vnc 0

# Setup the client
cd /usr/local/share/
sudo git clone https://github.com/kanaka/noVNC

# Go to root dir
cd /usr/bin/the-wolf-of-office/

# Create the service
sudo cp res/noVNC.service /lib/systemd/system/
# Reload config files
sudo systemctl daemon-reload
# Start on boot
sudo systemctl enable noVNC

service noVNC start
