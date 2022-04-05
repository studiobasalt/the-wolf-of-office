#!/bin/bash
echo "####################################"
echo "#"
echo "# Instalation of the Wolf of Office"
echo "# Made by Volcano"
echo "#"
echo "####################################"

# Cd to the root
cd "$(dirname "$0")"

# Detect supported os
detect-os(){
    deviceFile=$(tr -d '\0' </proc/device-tree/model)
    if [[ $deviceFile != *"Raspberry"* ]]; then
        echo 'No support for your OS'
        exit
    fi
}

# Select install mode
if [[ ! -f "/usr/bin/the-wolf-of-office/.gitignore" ]]
then
    detect-os
    reboot=true
    sudo git clone https://github.com/studiobasalt/the-wolf-of-office.git /usr/bin/the-wolf-of-office/
    cd /usr/bin/the-wolf-of-office/bin/
    bash ./inc/install/env-file.sh
    bash ./boot.sh
    bash ./inc/setup-os.sh
    bash ./inc/install/teleport.sh
    bash ./inc/install/novnc.sh
fi

# Run update script
bash ./update.sh

# Reboot if nessesiery
if [[ $reboot ]]; then
    echo '-- Rebooting the system --'
    reboot now
fi

echo '-- You can close this terminal --'
