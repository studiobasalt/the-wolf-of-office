#!/bin/bash

echo '-- (Re)Start services --'

sudo service noVNC restart
sudo service vncserver-x11-serviced restart
sudo service teleport restart
