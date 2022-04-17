#!/bin/bash

echo '-- (Re)Start services --'

sudo service noVNC restart
sudo service wolf-commands restart
sudo service wolf-dashboard restart
sudo service vncserver-x11-serviced restart
sudo service teleport restart
