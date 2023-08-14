#!/bin/bash

# Remove command from crontab for clean start
# !!! Use it also when depricating a cronjob !!!
(crontab -l | grep -v update.sh) | crontab -
(crontab -l | grep -v disable-hdmi.sh) | crontab -
(crontab -l | grep -v enable-hdmi.sh) | crontab -
(crontab -l | grep -v reboot) | crontab -

# Add crons
(crontab -l ; echo "0 3 * * * /usr/bin/the-wolf-of-office/apps/pi-setup/update.sh") | crontab -
(crontab -l ; echo "30 17 * * * /usr/bin/the-wolf-of-office/apps/system/disable-hdmi.sh") | crontab -
(crontab -l ; echo "30 8 * * * /usr/bin/the-wolf-of-office/apps/system/enable-hdmi.sh") | crontab -
(crontab -l ; echo "0 4 * * * /sbin/reboot now") | crontab -