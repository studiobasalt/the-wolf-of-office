#!/bin/bash

echo '-- Update OS --'

sudo apt-get -y update
sudo apt-get -y upgrade
sudo apt-get -y dist-upgrade
sudo apt -y full-upgrade
