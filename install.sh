#!/bin/bash
echo "####################################"
echo "#"
echo "# Instalation of the Wolf of Office"
echo "# Made by Studio Basalt"
echo "#"
echo "####################################"


function adminAccess {
    if [[ $UID != 0 ]]; then
        printColor 'The script needs admin access:'
        sudo echo "login suc6"
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
    deviceFile=$(cat /proc/device-tree/model)
    if [[ $deviceFile == *"Raspberry"* ]]; then
        if [[ -f "/etc/passwd" ]]
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
    cd /usr/local/bin/
    sudo git clone https://github.com/studiobasalt/the-wolf-of-office.git
    cd the-wolf-of-office
}
function installService {
    sudo cp resources/the-wolf.service /lib/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable the-wolf
    sudo systemctl start the-wolf
    sudo update-rc.d the-wolf enable
}
function update {
    git pull
}

function installPipLibs {
    pip3 install telepot
    pip3 install importlib
    pip3 install pygame
    pip3 install GitPython
    pip3 install tinydb
}
function cleanPipLibs{
    #for the older versions
    pip3 uninstall mpyg321b
}

#Init
adminAccess
installByOs
installPipLibs
cleanPipLibs
printColor 'You can close this terminal'
