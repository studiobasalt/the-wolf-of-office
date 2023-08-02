#!/bin/bash

echo '-- Install os packages --'

apt install -y raspberrypi-ui-mods unclutter xscreensaver
apt install -y nodejs npm
npm install -g yarn