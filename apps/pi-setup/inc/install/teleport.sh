#!/bin/bash

echo "-- Install Teleport --";

# Go to root dir
cd /usr/bin/the-wolf-of-office/apps/pi-setup/

# Load env's
. ./inc/utls/load-env-file.sh

# Get teleport token & server
echo Input the the teleport master server master.example.nl...
read TELEPORT_MASTER_SERVER
echo Create token on server: $TELEPORT_MASTER_SERVER
echo run: tctl nodes add --ttl=15m --roles=node,proxy,app
echo Copy token in terminal
read TELEPORT_TOKEN

# Create teleport config file
cp ./inc/template.teleport.yaml ./res/teleport.yaml
sed -e 's/DEVICE_NAME/'$DEVICE_NAME'/' ./res/teleport.yaml -i
sed -e 's/TELEPORT_TOKEN/'$TELEPORT_TOKEN'/' ./res/teleport.yaml -i
sed -e 's/TELEPORT_MASTER_SERVER/'$TELEPORT_MASTER_SERVER'/' ./res/teleport.yaml -i
mv ./res/teleport.yaml /etc/

# Install teleport app
curl https://goteleport.com/static/install.sh | bash -s 13.3.0
