#!/bin/bash

# Go to SD volmue
cd /Volumes/boot

# Enable SSL
sudo touch ssh

# Setup wifi
cat <<EOT >> wpa_supplicant.conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=NL

network={
    ssid="Wi-Fry chicken"
    psk="Kniggeking"
    key_mgmt=WPA-PSK
}
network={
    ssid="@Home1"
    psk="kniggeking"
    key_mgmt=WPA-PSK
}
EOT

# Create pi user with raspberry password
cat <<EOT >> userconf.txt
pi:\$6\$XVMUDAxAZzId8zoR\$LGSs7xmFJizbVSvnI3Ztqk0WbmPPioaLR17wX9ocERLneauYtdm1Hvhhww.pI9ui2MIJcbQu/gxhQ.1JutdQh/
EOT
