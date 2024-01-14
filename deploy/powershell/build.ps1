# Construit l'image Docker pour le projet Maven
docker build ../. -t projet-rentree-front

# Lance le conteneur Docker du projet Maven sur le réseau personnalisé, le npm install est lancé automatiquement
docker run --network mon-reseau -p 8080:8080 -d projet-rentree-front
