#!/bin/bash

echo '-- Installing noVNC --'

# enable and setup VNC service
sudo apt-get install realvnc-vnc-server
sudo raspi-config nonint do_vnc 0

# Setup the client server
cd /usr/local/share/
sudo git clone https://github.com/kanaka/noVNC
