#!/bin/bash

echo '-- Set screen orientation --'

. /usr/bin/the-wolf-of-office/apps/pi-setup/inc/utls/load-env-file.sh

echo $SCREEN_ORIENTATION

## SET user dynamic here

# #right left normal inverted
sudo ORIENTATION=$SCREEN_ORIENTATION -H -u volcano bash -c 'DISPLAY=:0 xrandr --output HDMI-1 --rotate $ORIENTATION'
