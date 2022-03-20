#!/bin/bash

echo "Set hostname for the pi: (.local will be added)"
read hostname
sudo raspi-config nonint do_hostname $varname.local
echo "Hotname set"
