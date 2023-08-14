#!/bash/bin

echo '-- Update The Wolf project --'
cd /usr/bin/the-wolf-of-office
git reset --hard
git pull

cd /usr/bin/the-wolf-of-office/apps/pi-setup/

bash ./inc/system/set-startup-script.sh
bash ./inc/install/env-file.sh update
bash ./inc/install/deps.sh
bash ./inc/utls/restart-services.sh
bash ./inc/install/timezone.sh # Depricate next version
bash ./inc/install/cron.sh