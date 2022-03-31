apt install -y raspberrypi-ui-mods chromium-browser
apt install -y unclutter

mkdir -p /home/pi/.config/lxsession/LXDE-pi/

cd /usr/bin/the-wolf-of-office/

cp res/lxsession-autostart /home/pi/.config/lxsession/LXDE-pi/autostart
