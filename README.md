# The Wolf of Office V0.6

Telegram bot made for the 51basalt office

This software is made to run on an Raspberry Pi and is tested on OSX

## Commands
/help - Show all available commands <br>
/helpAdvanced - Show all advanced commands <br>
/bell - Ring the bell for a sale! <br>
/relax - McConaughey chest beat <br>
/steekaan - Steek aan dat ding! <br>
/bier - Only when its time for beer! <br>
/flipflap - This is almost the best song in the world! <br>
/solong - Solong gayboyssss
/printer - Shows OctoPrint webcam on the TV
/bitcoin - Shows Bitcoin Stats on the TV
#### Comming soon
/wieIsDeLul - Wie o wie is de lul? <br>
/lunchtime - Time for lunch! <br>

## Advanced Commands
/update - Update server to latest version and reload commands <br>
/getchat - Get all the chat info in the terminal <br>
/version - Get the server version <br>
#### Comming soon
/dumpdb - Dump the database to terminal <br>
/startupMsg - Set a message on server startup <br>

## Fast install for linux
```bash
$ bash <(curl -Ls https://raw.githubusercontent.com/studiobasalt/the-wolf-of-office/main/bin/install.sh)
```

## How to Install
1. (Advanced) Run install.sh <br>
   (OSX) Open the folder ./resources/easyOSX and open install.app
2. Search for the BotFather on Telegram
3. Send /newbot to create a newbot
4. Follow the instructions of the BotFather
5. After creation send to the BotFather /mybots
6. Open your bot
7. Open "API Token" and copy the token
8. (Advanced) Run setToken.sh <br>
   (OSX) Open the folder ./resources/easyOSX and open setToken.app
9. (Advanced) bash run.sh <br>
    (OSX) Open the folder ./resources/easyOSX and open run.app

## How to add a new command
1. Copy the command_template.py file in the ./inc folder to ./inc/commands
2. Rename the file to your command
3. Setup the command
4. (optional) Place your sound files in de ./sounds folder
5. Update this README file

## Setup the pi
1. Install os
2. create ssh file in /boot of sd cart
3. create a txt file in /boot/ wpa_supplicant.conf
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
7. Install the project
```
bash <(curl -Ls https://raw.githubusercontent.com/studiobasalt/the-wolf-of-office/main/bin/install.sh)
```
4. Local login with realvnc client and edit in UI vnc option (right click icon top)
    Encryption: Prefer off
    Authentication: VNC password
5. 

## Credits
[Studio Basalt](https://studiobasalt.com "Studio Basalt") <br>
[51Designs](https://www.51designs.nl/) <br>
