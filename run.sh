#!/bin/sh

#!/bin/sh

# Lancer npm run web en arrière-plan
npm run web > app.log 2>&1 &

# Attendre que le fichier app.log soit créé (indiquant que npm run web a commencé)
while [ ! -f app.log ]; do
  sleep 1
done

echo "L'application est en cours de compilation. Veuillez patienter..."

# Attendre que la chaîne "web compiled successfully" apparaisse dans le fichier de log
while ! grep -q "web compiled successfully" app.log; do
  echo "En attente de la compilation de web..."
  sleep 1
done

echo "L'application est maintenant en cours d'exécution."

# Laissez le terminal ouvert
tail -f /dev/null
