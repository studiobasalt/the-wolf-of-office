#!/bin/bash

{
export $(cat /usr/bin/the-wolf-of-office/apps/pi-setup/.env | xargs)
} &> /dev/null

echo $DEVICE_NAME "Loaded .env file!"
