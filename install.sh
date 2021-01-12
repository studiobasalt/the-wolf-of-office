#!/bin/bash
echo "####################################"
echo "#"
echo "# Instalation of the Wolf of Office"
echo "# Made by Studio Basalt"
echo "#"
echo "####################################"

# Cd to script dir
cd "$(dirname "$0")"

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
        if ! command -v brew &> /dev/null; then
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        if ! command -v python3.9 &> /dev/null; then
            brew install python3.9
            brew link python3.9
        fi
    fi

    #Install for linux users
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if ! command -v python3 &> /dev/null; then
            sudo apt install python3
        fi
        if ! command -v pip3 &> /dev/null; then
            sudo apt install python-pip3
        fi
    fi

    #Install standalone for Raspberry pi
    deviceFile=$(tr -d '\0' </proc/device-tree/model)
    if [[ $deviceFile == *"Raspberry"* ]]; then
        if [[ -f "/usr/bin/the-wolf-of-office/theWolf.py" ]]
        then
            update
        else
            installStandAlone
        fi
        installService
    fi
}

function installStandAlone {
    #download repo and install
    cd /usr/bin/
    sudo git clone https://github.com/studiobasalt/the-wolf-of-office.git
    cd the-wolf-of-office
}
function installService {
    cd /usr/bin/the-wolf-of-office
    # Set script premmsions
    chmod 775 run.sh
    # Stop service if availbe
    sudo service the-wolf stop
    # Copy servers file for system
    sudo cp resources/the-wolf.service /lib/systemd/system/
    # Reload config files
    sudo systemctl daemon-reload
    # Start on boot
    sudo systemctl enable the-wolf
    # Start service
    sudo service the-wolf start
}

function update {
    cd /usr/bin/the-wolf-of-office
    git pull
}

function installPipLibs {
    pip3 install telepot
    pip3 install importlib
    pip3 install pygame
    pip3 install GitPython
    pip3 install tinydb
}

function cleanPipLibs {
    pip3 uninstall mpyg321b -y
    pip3 uninstall GitPython -y
}

#Init
adminAccess
installByOs
installPipLibs
cleanPipLibs
printColor 'You can close this terminal'
