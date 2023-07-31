#!/bin/bash

echo '-- Install pip (python3) libs --'

# Cache pip list
pipList=$(pip3 list --disable-pip-version-check)

# Fast install and check
function install {
    out=$(echo "$pipList" | grep $1)
    if [[ -z $out ]]; then
        pip3 install $1
        return
    fi
    echo "$1 already intalled"
}

# Install pip3 libs
install importlib
install pygame
install tinydb
install Flask
install python-dotenv

echo '-- Install os packages --'
apt install -y raspberrypi-ui-mods chromium-browser unclutter xscreensaver
