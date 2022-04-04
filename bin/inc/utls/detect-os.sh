
deviceFile=$(tr -d '\0' </proc/device-tree/model)
if [[ $deviceFile != *"Raspberry"* ]]; then
    echo 'No support for you OS (bin/inc/utls/detect-os.sh)'
    exit 1
fi
