# The Wolf of Office V0.6

Telegram bot made for the 51basalt office

This software is made to run on an Raspberry Pi

## Commands
/help for command list

## Fast install for the PI
```bash
$ bash <(curl -Ls https://raw.githubusercontent.com/studiobasalt/the-wolf-of-office/main/bin/install.sh)
```

## How to add a new command
1. Copy the command_template.py file in the ./inc folder to ./inc/commands
2. Rename the file to your command
3. Setup the command
4. (optional) Place your sound files in de ./sounds folder
5. Update this README file

## Setup a pi
1. Install os
2. create ssh file in /boot of sd cart
3. create a txt file in /boot/ wpa_supplicant.conf (or use bin/pi/sd-setup.sh for fast setup)
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=NL

network={
    ssid="YOUR_NETWORK_NAME"
    psk="YOUR_PASSWORD"
    key_mgmt=WPA-PSK
}
```
4. Login over ssh
5. Change ssh password
7. Install the project, and follow instructions
```
bash <(curl -Ls https://raw.githubusercontent.com/studiobasalt/the-wolf-of-office/main/bin/install.sh)
```
4. Local login with realvnc client and edit in UI vnc option (right click icon top)
    (download: https://www.realvnc.com/en/connect/download/viewer/)
    This is needed so that noVNC can run
    set options:
    Encryption: Prefer off
    Authentication: VNC password
5. Set a VNC password
