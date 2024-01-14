#!/bin/bash

# Crée un réseau Docker personnalisé
docker network create mon-reseau

adminUsername="admin"
adminPassword="admin"
newPassword="admin1"
sonarqubeURL="http://localhost:9000"

# Vérifie si un conteneur SonarQube est déjà lancé sur les mêmes ports
existingContainer=$(docker ps --filter "publish=9000" --filter "publish=9092" -q)
if [ -z "$existingContainer" ]; then
    echo "Un conteneur SonarQube n'est pas déjà en cours d'exécution sur les mêmes ports."
    # Lance le conteneur SonarQube sur le réseau personnalisé
    docker run -d --name sonarqube --network mon-reseau -p 9000:9000 -p 9092:9092 sonarqube:latest

    # Récupère l'adresse IP attribuée au conteneur SonarQube
    sonarqubeIP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sonarqube)
    echo "ip du conteneur : $sonarqubeIP"

    # Vérifie si l'adresse IP a été récupérée correctement
    if [ -z "$sonarqubeIP" ]; then
        echo "Erreur : L'adresse IP du conteneur SonarQube n'a pas été récupérée."
        exit 1
    fi

    # Configuration des paramètres
    echo "URL de SonarQube : $sonarqubeURL"

    echo "On va attendre ensemble 40 sec que SonarQube se lance"
    sleep 40
    echo "SonarQube est maintenant prêt !"

    # Changer le mot de passe de l'admin avec curl
    echo "Envoi de la requête de changement de mot de passe avec curl"
    curl -u admin:admin -X POST "http://localhost:9000/api/users/change_password?login=admin&previousPassword=admin&password=$newPassword"

    if [ $? -ne 0 ]; then
        echo "Erreur lors du changement de mot de passe avec curl."
        exit 1
    fi
    echo "Mot de passe changé avec succès."
else
    sonarqubeIP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sonarqube)
fi

# Mettre à jour les informations d'authentification avec le nouveau mot de passe
auth=$(echo -n "${adminUsername}:${newPassword}" | base64)

# V
curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Basic $auth" $sonarqubeURL
if [ $? -ne 200 ]; then
echo "Erreur : Impossible de se connecter à l'URL de SonarQube ($sonarqubeURL) avec le nouveau mot de passe."
exit 1
fi
projectName="front" # Remplacez par le nom réel de votre projet
projectKey="front" # Clé unique pour le projet
projectVisibility="public" # Peut être "public" ou "privat


sonarqubeProjectsQueryURL="$sonarqubeURL/api/projects/search"

projectsResponse=$(curl -s -H "Authorization: Basic $auth" $sonarqubeProjectsQueryURL)
if [ -z "$projectsResponse" ]; then
echo "La réponse de l'appel à l'API est null. Vérifiez l'URL de l'API."
exit 1
fi

if echo "$projectsResponse" | grep -q ""key":"$projectKey""; then
echo "Le projet '$projectName' existe déjà dans SonarQube."
else
# Le projet n'existe pas, procédez à la création
# Ajoutez ici votre logique pour créer un nouveau projet
echo "Le projet '$projectName' n'existe pas. Création en cours..."
fi

GenerateRandomString() {
echo $(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 20 | head -n 1)
}

tokenName=$(GenerateRandomString)
echo "Nom du token généré : $tokenName"

tokenGenerationPayload="name=$tokenName"

sonarqubeTokenGenerationURL="$sonarqubeURL/api/user_tokens/generate"

tokenResponse=$(curl -s -X POST -H "Authorization: Basic $auth" -H "Content-Type: application/x-www-form-urlencoded" -d "$tokenGenerationPayload" $sonarqubeTokenGenerationURL)
if [ -z "$tokenResponse" ]; then
echo "Erreur lors de la génération du token."
exit 1
fi
token=$(echo $tokenResponse | grep -o '"token":"[^"]' | grep -o '[^"]$')


if [ -n "$token" ]; then
echo "Token généré avec succès : $token"
else
echo "Erreur lors de l'extraction du token de la réponse."
exit 1
fi

sonarqubeURL="http://$sonarqubeIP:9000"

echo "SonarQube URL: $sonarqubeURL"
echo "Sonar Token: $token"

dockerCommand="docker run --network mon-reseau -e SONAR_HOST_URL=$sonarqubeURL -e SONAR_TOKEN=$token project-rentree-front sonar-scanner"
eval $dockerCommand