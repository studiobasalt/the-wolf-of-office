#!/bin/bash

if [[ $UID != 0 ]]; then
    echo 'The script needs admin access:'
    sudo echo "login suc6!"
fi
