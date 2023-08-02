#!/bash/bin

cd /usr/bin/the-wolf-of-office/apps/pi-setup/

bash ./inc/update-the-wolf.sh
bash ./boot.sh
bash ./inc/system/set-startup-script.sh
bash ./inc/install/env-file.sh update
bash ./inc/install/deps.sh
bash ./inc/install/services.sh
bash ./inc/utls/restart-services.sh
