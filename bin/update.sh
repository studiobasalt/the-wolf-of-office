#!/bash/bin

cd /usr/bin/the-wolf-of-office/bin

bash ./inc/update-the-wolf.sh
bash ./boot.sh
bash ./inc/system/set-startup-script.sh
bash ./inc/install/env-file.sh update
bash ./inc/system/update.sh
bash ./inc/install/deps.sh
bash ./inc/install/services.sh
bash ./inc/utls/restart-services.sh
