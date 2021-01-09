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
        sudo echo "login"
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
        brew install python3
        brew link python3
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
    if ! command -v raspi-config &> /dev/null; then
        FILE=theWolf.py
        if test -f "$FILE"
        then
            update
        else
            installStandAlone
        fi
    fi
}

function installStandAlone {
    #download repo and install
    cd /usr/local/bin/
    sudo git clone https://github.com/studiobasalt/the-wolf-of-office.git
    cd the-wolf-of-office

    #Install service
    sudo cp resources/the-wolf.service /lib/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable the-wolf.service
    sudo systemctl start the-wolf.service
    sudo update-rc.d the-wolf.service enable
}
function update {
    git pull
}

function installPipLibs {
    pip3 install telepot
    pip3 uninstall mpyg321b
    pip3 install importlib
    pip3 install pygame
    pip3 install GitPython

    tput setaf 1
    read -p "Install development tools? (Not for the noobs! Type Y for Yes N for no:" -n 1 -r
    echo
    tput sgr0
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        pip3 install mac-appify
    else
        echo 'Understandable, have a nice day';
    fi
}


#Init
adminAccess
installByOs
installPipLibs
printColor 'You can close this terminal'
