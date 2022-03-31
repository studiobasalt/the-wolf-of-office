
# cd "${0%/*}/"

{
export $(cat $1 | xargs)
} &> /dev/null

echo $DEVICE_NAME "Loaded .env file"
