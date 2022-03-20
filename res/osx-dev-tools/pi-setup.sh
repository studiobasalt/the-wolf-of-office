#!/bin/bash


cd /Volumes/boot

sudo touch ssh


cat <<EOT >> wpa_supplicant.conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=NL

network={
    ssid=""
    psk=""
    key_mgmt=WPA-PSK
}
EOT
