#!/bin/bash
echo "####################################"
echo "#"
echo "# Instalation of the Wolf of Office"
echo "# Made by Volcano"
echo "#"
echo "####################################"

# Cd to script dir
cd "$(dirname "$0")"

reboot=false

function adminAccess {
    if [[ $UID != 0 ]]; then
        printColor 'The script needs admin access:'
        sudo echo "login suc6!"
    fi
}
function printColor {
    tput setaf 1
    echo $1
    tput sgr0
}
function installByOs {
    #Install for osx users
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo 'No support for osx'
        return
    fi

    #Install for linux users
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo 'No support for linux'
        return
    fi

    #Install standalone for Raspberry pi
    deviceFile=$(tr -d '\0' </proc/device-tree/model)
    if [[ $deviceFile == *"Raspberry"* ]]; then
        if [[ -f "/usr/bin/the-wolf-of-office/.gitignore" ]]
        then
            update
        else
            installStandAlone
            setupPi
        fi
        installServices
    fi
    echo 'No support for you OS'
    return
}

function installStandAlone {
    #download repo and install
    cd /usr/bin/
    sudo git clone https://github.com/studiobasalt/the-wolf-of-office.git
    cd the-wolf-of-office
}
function installServices {
    cd /usr/bin/the-wolf-of-office
    # Stop service if availbe
    sudo service noVNC stop
    sudo service wolf-commands stop
    sudo service wofl-dashboard stop
    # Copy servers file for system
    sudo cp resources/services/noVNCservice /lib/systemd/system/
    sudo cp resources/services/wolf-dasboard.service /lib/systemd/system/
    sudo cp resources/services/wolf-commands.service /lib/systemd/system/
    # Reload config files
    sudo systemctl daemon-reload
    # Start on boot
    sudo systemctl enable noVNC
    sudo systemctl enable wolf-commands
    sudo systemctl enable wolf-dashboard
}
function setupPi{
    reboot=true
    cd "$(dirname "$0")"
    ./setup-env-file.sh
    ./pi/set-hostname.sh
    ./pi/disable-pi-wiz.sh
    ./pi/disable-screen-saver.sh
    # ./pi/disable-bluetooth.sh
    ./pi/disable-wifi-sleep.sh
    ./pi/install-teleport.sh
    ./pi/setup-novnc.sh
    ./pi/boot.sh

    update
}
function startServices {
    cd "$(dirname "$0")"
    ./restart-services.sh
}

function update {
    cd /usr/bin/the-wolf-of-office
    git pull
    cd bin/
    ./pi/update.sh
    ./pi/install-dashboard-startup.sh
}

function installPipLibs {
    pip3 install importlib
    pip3 install pygame
    pip3 install tinydb
    pip3 install flask
    pip3 install python-dotenv
}

# __MAIN__
adminAccess
installByOs
installPipLibs
startServices
if [[ reboot ]]; then
    reboot now
fi
printColor 'You can close this terminal'
