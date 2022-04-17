#!/bin/bash

echo '-- Set screen orientation --'

. /usr/bin/the-wolf-of-office/bin/inc/utls/load-env-file.sh

# #right left normal inverted
sudo ORIENTATION=$SCREEN_ORIENTATION -H -u pi bash -c 'DISPLAY=:0 xrandr --output HDMI-1 --rotate $ORIENTATION'
