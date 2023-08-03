#!/bin/bash

echo '-- Installing VNC (remote) --'

# enable and setup VNC service
sudo raspi-config nonint do_vnc 0

# Set VNC password
vncpasswd -service

# Install config
cd /usr/bin/the-wolf-of-office/apps/pi-setup/
cp assets/vncserver-x11.config /etc/vnc/config.d/vncserver-x11
