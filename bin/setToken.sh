#!/bin/bash

function printColor {
    tput setaf 1
    echo $1
    tput sgr0
}

# Cd to script dir
cd "$(dirname "$0")"

# Skip script if not runned in project dir
if ! test -f "theWolf.py"; then
    printColor 'Run script in root dir of project pls!'
    exit
fi

printColor "What is your Telegram Bot's token?"
read token

echo $token > .token

printColor "Your token is set!"
printColor "You can exit this terminal :)"
