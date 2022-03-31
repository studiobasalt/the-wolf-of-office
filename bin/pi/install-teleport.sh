# Go to root dir
cd "$(dirname "$0")"

# Load env
. ../load-env-file.sh ../../.env

# Get teleport token
echo Input the the teleport master server master.example.nl...
read TELEPORT_MASTER_SERVER
echo Create token on server: $TELEPORT_MASTER_SERVER
echo run: tctl nodes add --ttl=15m --roles=node,proxy,app
echo Copy token in terminal
read TELEPORT_TOKEN

# Create teleport config file
cp ../../res/template.teleport.yaml ../../res/teleport.yaml
sed -i '' -e 's/DEVICE_NAME/'$DEVICE_NAME'/' ../../res/teleport.yaml
sed -i '' -e 's/TELEPORT_TOKEN/'$TELEPORT_TOKEN'/' ../../res/teleport.yaml
sed -i '' -e 's/TELEPORT_MASTER_SERVER/'$TELEPORT_MASTER_SERVER'/' ../../res/teleport.yaml

# Install teleport app and service
cd /tmp
curl -O https://get.gravitational.com/teleport-v9.0.1-linux-arm-bin.tar.gz
tar -xzf teleport-v9.0.1-linux-arm-bin.tar.gz
cd teleport
sudo ./install
