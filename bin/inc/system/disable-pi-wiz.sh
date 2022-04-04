#!/bin/bash

echo "-- Disable pi Wiz --"

sudo rm /etc/xdg/autostart/piwiz.desktop
sudo mv /usr/share/piwiz/srprompt.wav /usr/share/piwiz/srprompt.wav.bak
