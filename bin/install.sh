#!/bin/bash
echo "####################################"
echo "#"
echo "# Instalation of the Wolf of Office"
echo "# Made by Volcano"
echo "#"
echo "####################################"

# Cd to the root
cd "$(dirname "$0")"

# Set reboot boolean
reboot=false

# Select install mode
if [[ -f !"/usr/bin/the-wolf-of-office/.gitignore" ]]
then
    reboot=true
    . ./inc/utls/detect-os.sh
    bash ./boot.sh
    bash ./inc/install/standalone.sh
    bash ./inc/setup-os.sh
    bash ./setup-env-file.sh
    bash ./inc/install/teleport.sh
    bash ./inc/install/novnc.sh
else

# Run update script
bash ./update.sh

# Reboot if nessesiery
if [[ reboot ]]; then
    echo '-- Rebooting the system --'
    reboot now
fi

echo '-- You can close this terminal --'
