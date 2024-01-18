#!/bin/sh

# Lancer mvn spring-boot:run en arrière-plan et rediriger la sortie vers un fichier de log
npm run web > app.log 2>&1 &

# Attendre que la chaîne "Started" apparaisse dans le fichier de log
while ! grep -q "Web is waiting on" app.log; do
  sleep 1
done

echo "L'application est maintenant en cours d'exécution."
