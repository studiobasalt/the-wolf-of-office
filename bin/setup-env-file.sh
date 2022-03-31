cd /usr/bin/the-wolf-of-office/

# Get user inputs
echo Input device name, this is also the hostname for the pi
read DEVICE_NAME
echo Set orientation of the screen on bootup: right left normal inverted
echo This can you edit inside /usr/bin/the-wolf-of-office/.env
read ORIENTATION

# Create .env file
cp template.env .env
sed -i '' -e 's/DEVICE_NAME_INPUT/'$DEVICE_NAME'/' .env
sed -i '' -e 's/SCREEN_ORIENTATION_INPUT/'$ORIENTATION'/' .env
