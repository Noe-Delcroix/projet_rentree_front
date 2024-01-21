#!/bin/bash

# Chemin vers le fichier env.env
env_file="../env.env"

env_value=""
# Vérifier si le fichier existe
if [ -f "$env_file" ]; then
    # Utiliser grep pour rechercher la ligne contenant la variable env
    env_line=$(grep '^env=' "$env_file")

    # Vérifier si la ligne a été trouvée
    if [ -n "$env_line" ]; then
        # Utiliser cut pour extraire la valeur de la variable env
        env_value=$(echo "$env_line" | cut -d'=' -f2)
        echo "La valeur de 'env' est : $env_value"
    else
        echo "La variable 'env' n'a pas été trouvée dans $env_file."
    fi
else
    echo "Le fichier $env_file n'existe pas."
fi


# Nom du conteneur Docker
nomConteneur="projet_rentree_front_$env_value"

commande="/usr/src/app/run.sh"

# Exécute la commande dans le conteneur Docker
echo "Exécution de la commande dans le conteneur Docker : $nomConteneur"
docker exec "$nomConteneur" chmod u+x "$commande"
docker exec "$nomConteneur" $commande

# Vérifie le code de retour de la commande
if [ $? -eq 0 ]; then
    echo "La commande a été exécutée avec succès dans le conteneur."
else
    echo "La commande a échoué dans le conteneur."
    exit $?
fi

chmod u+x ./remove_docker.sh
./remove_docker.sh

image_name="projet_rentree_back"

# Nom recherché
search_name="projet_rentree_back"

# Exécuter "docker ps" pour lister les conteneurs en cours d'exécution
# Utiliser "grep" pour filtrer les résultats par le nom du conteneur
# Utiliser "awk" pour extraire le dernier mot du nom du conteneur
back_env_value=$(docker ps --format "{{.Names}}" | grep "$search_name" | awk -F '-' '{print $NF}')

if [ -n "$back_env_value" ]; then
    echo "Le dernier mot du nom du conteneur est : $back_env_value"
else
    echo "Aucun conteneur contenant '$search_name' n'est actuellement en cours d'exécution."
fi

if [ "$env_value" = "blue" ]; then
    if [ "$back_env_value" = "projet_rentree_back_blue" ]; then
        docker exec projet_rentree_front_blue chmod u+x ./change_back_port.sh
        docker exec projet_rentree_front_blue ./change_back_port.sh 8081
    else
        docker exec projet_rentree_front_blue chmod u+x ./change_back_port.sh
        docker exec projet_rentree_front_blue ./change_back_port.sh 8080
    fi
else
    if [ "$back_env_value" = "projet_rentree_back_blue" ]; then
        docker exec projet_rentree_front_green chmod u+x ./change_back_port.sh
        docker exec projet_rentree_front_green ./change_back_port.sh 8080
    else
        docker exec projet_rentree_front_green chmod u+x ./change_back_port.sh
        docker exec projet_rentree_front_green ./change_back_port.sh 8081
    fi
fi
