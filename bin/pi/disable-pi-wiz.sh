#!/bin/bash

# Disable voice on startup
sudo rm /etc/xdg/autostart/piwiz.desktop
sudo mv /usr/share/piwiz/srprompt.wav /usr/share/piwiz/srprompt.wav.bak
