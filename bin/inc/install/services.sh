#!/bin/bash

echo '-- Install Services --'

# cd into the project
cd /usr/bin/the-wolf-of-office

# Stop service if availbe
sudo service noVNC stop
sudo service wolf-commands stop
sudo service wolf-dashboard stop
sudo service teleport stop

# Copy service file for system
sudo cp res/services/noVNC.service /lib/systemd/system/
sudo cp res/services/wolf-dashboard.service /lib/systemd/system/
sudo cp res/services/wolf-commands.service /lib/systemd/system/
sudo cp res/services/teleport.service /lib/systemd/system/

# Reload config files
sudo systemctl daemon-reload

# Start services on boot
sudo systemctl enable noVNC
sudo systemctl enable wolf-commands
sudo systemctl enable wolf-dashboard
sudo systemctl enable teleport
