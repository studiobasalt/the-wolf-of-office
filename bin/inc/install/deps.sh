#!/bin/bash

echo '-- Install pip (python3) libs --'
function install {
    out=$(pip3 list --disable-pip-version-check | grep $1)
    if [[ -z $out ]]; then
        pip3 install $1
        return
    fi
    echo "$1 already intalled"
}

install importlib
install pygame
install tinydb
install Flask
install python-dotenv

echo '-- Install os packages --'
apt install -y raspberrypi-ui-mods chromium-browser
apt install -y unclutter
