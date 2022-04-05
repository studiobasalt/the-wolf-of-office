
echo '-- Setup pi --'

# Set root
cd /usr/bin/the-wolf-of-office/bin/inc/system/

# Run script parts
bash ./disable-screen-saver.sh
bash ./disable-pi-wiz.sh
bash ./set-hostname.sh
bash ./reset-password.sh
