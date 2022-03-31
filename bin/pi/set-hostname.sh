#!/bin/bash

# Go to root dir
cd "$(dirname "$0")"

# Load env
. ../load-env-file.sh ../../.env


sudo raspi-config nonint do_hostname $DEVICE_NAME
