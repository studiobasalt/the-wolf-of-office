#!/bin/bash

cd /usr/bin/the-wolf-of-office/apps/pi-setup/

echo '-- Setting .ENV file pi setup --'

if [[ $1 != 'update' ]]; then
    # Get user inputs
    echo Input device name, this is also the hostname for the pi
    echo "!! No caps in name (this is used for hostname and teleport novnc server)"
    read DEVICE_NAME
    echo Set orientation of the screen on bootup: right left normal inverted
    echo This can you edit inside /usr/bin/the-wolf-of-office/.env
    read SCREEN_ORIENTATION
    echo Input the main user name of the pi
    read USER_NAME
    echo 'Input the kiosk url for the app without (http:// or https://)'
    read KIOSK_URL
    KIOSK_URL=$(printf '%s\n' "$KIOSK_URL" | sed -e 's/[\/&]/\\&/g')
else
    # Load old env file
    . ./inc/load-env-file.sh
fi

echo '-- .ENV file set --'

# Create .env file
cp template.env .env
sed -e 's/DEVICE_NAME_INPUT/'$DEVICE_NAME'/' ./.env -i
sed -e 's/SCREEN_ORIENTATION_INPUT/'$SCREEN_ORIENTATION'/' ./.env -i
sed -e 's/USER_NAME_INPUT/'$USER_NAME'/' ./.env -i
sed -e 's/KIOSK_URL_INPUT/'$KIOSK_URL'/' ./.env -i


echo '-- .ENV Setup for kiosk browser --'
cd /usr/bin/the-wolf-of-office/apps/pi-setup/assets/
cp lxsession-autostart.template lxsession-autostart
sed -e 's/KIOSK_URL_INPUT/'$KIOSK_URL'/' ./lxsession-autostart -i