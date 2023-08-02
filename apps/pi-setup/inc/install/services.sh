#!/bin/bash

echo '-- Install Services --'

# cd into the project
cd /usr/bin/the-wolf-of-office/apps/pi-setup/

# Stop service if availbe
sudo service noVNC stop
sudo service teleport stop

# Copy service file for system
sudo cp services/noVNC.service /lib/systemd/system/
sudo cp services/teleport.service /lib/systemd/system/

# Reload config files
sudo systemctl daemon-reload

# Start services on boot
sudo systemctl enable noVNC
sudo systemctl enable teleport
