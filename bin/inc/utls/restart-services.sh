#!/bin/bash

echo '-- (Re)Start services --'

sudo service noVNC restart
sudo service wolf-commands restart
sudo service wolf-dashboard restart
service vncserver-x11-serviced restart
