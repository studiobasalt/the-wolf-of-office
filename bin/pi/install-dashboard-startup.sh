apt install -y raspberrypi-ui-mods chromium-browser
apt install -y unclutter

mkdir -p /home/pi/.config/lxsession/LXDE-pi/
cp ../../res/lxsession-autostart /home/pi/.config/lxsession/LXDE-pi/autostart
