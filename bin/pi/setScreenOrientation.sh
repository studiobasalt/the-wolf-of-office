#!/bin/bash

. ../load-env-file.sh ../../.env

#right left normal inverted
DISPLAY=:0 xrandr --output HDMI-1 --rotate $SCREEN_ORIENTATION
