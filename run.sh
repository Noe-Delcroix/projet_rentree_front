#!/bin/sh

# Lancer npm run web en arrière-plan en utilisant nohup
nohup npm run web > app.log 2>&1 &

# Attendre que la chaîne "web compiled successfully" apparaisse dans le fichier de log
while ! grep -q "web compiled successfully" app.log; do
  echo "waiting for web to compile"
  sleep 1
done

echo "L'application est maintenant en cours d'exécution."
