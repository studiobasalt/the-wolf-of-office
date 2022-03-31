#!/bin/bash

cd /usr/bin/the-wolf-of-office/bin/pi

. ../load-env-file.sh ../../.env

#right left normal inverted
DISPLAY=:0 xrandr --output HDMI-1 --rotate $SCREEN_ORIENTATION
