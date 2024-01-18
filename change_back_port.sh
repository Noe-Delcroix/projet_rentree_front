#!/bin/bash

FILE="./src/back.js"

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <port>"
    exit 1
fi

NEW_PORT="$1"
echo "Changing port in $FILE to $NEW_PORT"

sed -i "s/let port = [0-9]\+;/let port = $NEW_PORT;/g" "$FILE"

if [ $? -eq 0 ]; then
    echo "Port changed to $NEW_PORT"
else
    echo "No matching port found in $FILE"
fi
