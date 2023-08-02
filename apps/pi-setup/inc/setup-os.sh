
echo '-- Setup pi --'

# Set dir
cd /usr/bin/the-wolf-of-office/app/pi-setup/inc/system/

# Run script parts
bash ./disable-screen-saver.sh
bash ./disable-pi-wiz.sh
bash ./set-hostname.sh
bash ./reset-password.sh
