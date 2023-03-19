#!/bin/bash

echo '-- Installing noVNC --'

# enable and setup VNC service
sudo apt-get install realvnc-vnc-server
sudo raspi-config nonint do_vnc 0

# Setup the client server
apt install novnc -y
ln -s /usr/share/novnc/vnc.html /usr/share/novnc/index.html

# Set VNC password
vncpasswd -service

# Install config
cd /usr/bin/the-wolf-of-office
cp res/vncserver-x11.config /etc/vnc/config.d/vncserver-x11
