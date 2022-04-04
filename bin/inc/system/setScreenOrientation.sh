#!/bin/bash

cd

. ./usr/bin/the-wolf-of-office/bin/inc/utls/load-env-file.sh

#right left normal inverted
DISPLAY=:0 xrandr --output HDMI-1 --rotate $SCREEN_ORIENTATION
