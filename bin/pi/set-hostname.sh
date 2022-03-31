#!/bin/bash

# Go to root dir
cd /usr/bin/the-wolf-of-office/bin/pi

# Load env
. ../load-env-file.sh ../../.env


sudo raspi-config nonint do_hostname $DEVICE_NAME
