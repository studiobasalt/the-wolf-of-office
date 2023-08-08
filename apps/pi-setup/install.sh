#!/bin/bash
echo "####################################"
echo "#"
echo "# Instalation of the Wolf of Office"
echo "# Made by Volcano"
echo "#"
echo "####################################"

# Check if script is runned as root
if [ "$EUID" -ne 0 ]
  then echo "-- Please run as root (sudo) --"
  exit
fi

# Detect supported os
deviceFile=$(tr -d '\0' </proc/device-tree/model)
if [[ $deviceFile != *"Raspberry"* ]]; then
    echo 'No support for your OS'
    exit
fi

# Get and set repo
sudo git clone https://github.com/studiobasalt/the-wolf-of-office.git /usr/bin/the-wolf-of-office/
cd /usr/bin/the-wolf-of-office/apps/pi-setup/

# Install and setup
bash ./inc/install/env-file.sh
bash ./inc/system/disable-wifi-sleep.sh
bash ./inc/system/disable-screen-saver.sh
bash ./inc/system/set-hostname.sh
bash ./inc/install/vnc.sh

bash ./update.sh

echo '-- Rebooting the system --'
reboot now

