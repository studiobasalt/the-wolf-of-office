#!/bin/bash

echo "-- Set device hostname --"

# Load env
. /usr/bin/the-wolf-of-office/apps/pi-setup/inc/utls/load-env-file.sh

sudo raspi-config nonint do_hostname $DEVICE_NAME
