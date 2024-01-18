#!/bin/bash

FILE="./src/back.js"
PORT_8080="let port = 8080;"
PORT_8081="let port = 8081;"

echo "Changing port in $FILE"

if grep -q "$PORT_8080" "$FILE"; then
    sed -i "s/$PORT_8080/$PORT_8081/g" "$FILE"
    echo "Port changed to 8081"
elif grep -q "$PORT_8081" "$FILE"; then
    sed -i "s/$PORT_8081/$PORT_8080/g" "$FILE"
    echo "Port changed to 8080"
else
    echo "No matching port found in $FILE"
fi
