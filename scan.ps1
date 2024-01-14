# Crée un réseau Docker personnalisé
docker network create mon-reseau

# Lance le conteneur SonarQube sur le réseau personnalisé
docker run -d --name sonarqube --network mon-reseau -p 9000:9000 -p 9092:9092 sonarqube:latest

# Récupère l'adresse IP attribuée au conteneur SonarQube
$sonarqubeIP = docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sonarqube
Write-Host "ip du conteneur : $sonarqubeIP"

# Vérifie si l'adresse IP a été récupérée correctement
if (-not $sonarqubeIP) {
    Write-Host "Erreur : L'adresse IP du conteneur SonarQube n'a pas été récupérée."
    exit
}

# Configuration des paramètres
$sonarqubeURL = "http://localhost:9000"
Write-Host "URL de SonarQube : $sonarqubeURL"

$adminUsername = "admin"
$adminPassword = "admin"
$newPassword = "admin1"

Write-Host "On va attendre ensemble 40 sec que SonarQube se lance"
Start-Sleep -Seconds 40
Write-Host "SonarQube est maintenant prêt !"

# Authentification initiale
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${adminUsername}:${adminPassword}"))
$headers = @{
    Authorization = "Basic $base64AuthInfo"
}

# Vérifie si l'URL de SonarQube est accessible
try {
    Invoke-WebRequest -Uri $sonarqubeURL -UseBasicParsing
} catch {
    Write-Host "Erreur : Impossible de se connecter à l'URL de SonarQube ($sonarqubeURL)."
    exit
}

# Changer le mot de passe de l'admin avec curl
$curlCommand = 'curl'
$curlArgs = '-u', 'admin:admin', '-X', 'POST', "http://localhost:9000/api/users/change_password?login=admin&previousPassword=admin&password=$newPassword"

Write-Host "Envoi de la requête de changement de mot de passe avec curl"

try {
    Start-Process $curlCommand -ArgumentList $curlArgs -NoNewWindow -Wait
    Write-Host "Mot de passe changé avec succès."
} catch {
    Write-Host "Erreur lors du changement de mot de passe avec curl."
    Write-Host "Détails de l'erreur : $_"
    exit
}

# Mettre à jour les informations d'authentification avec le nouveau mot de passe
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${adminUsername}:${newPassword}"))
$headers["Authorization"] = "Basic $base64AuthInfo"

# Vérifie si l'URL de SonarQube est accessible avec le nouveau mot de passe
try {
    Invoke-WebRequest -Uri $sonarqubeURL -UseBasicParsing -Headers $headers
} catch {
    Write-Host "Erreur : Impossible de se connecter à l'URL de SonarQube ($sonarqubeURL) avec le nouveau mot de passe."
    exit
}# Configuration des paramètres pour la requête de création de projet
 $projectName = "front"  # Remplacez par le nom réel de votre projet
 $projectKey = "front"          # Clé unique pour le projet
 $projectVisibility = "public" # Peut être "public" ou "private"

 # Préparation du payload pour la requête
 $projectCreationPayload = @{
     "name" = $projectName
     "project" = $projectKey
     "visibility" = $projectVisibility
 }

 # Convertit le payload en chaîne de requête pour l'URL (format x-www-form-urlencoded)
 $projectCreationQueryString = [System.Web.HttpUtility]::ParseQueryString([String]::Empty)
 foreach ($key in $projectCreationPayload.Keys) {
     $projectCreationQueryString[$key] = $projectCreationPayload[$key]
 }
 $projectCreationString = $projectCreationQueryString.ToString()

 # URL pour la création du projet
 $sonarqubeProjectCreationURL = $sonarqubeURL + "/api/projects/create"

 # Envoi de la requête
 try {
     $response = Invoke-RestMethod -Uri $sonarqubeProjectCreationURL -Method Post -Headers $headers -ContentType "application/x-www-form-urlencoded" -Body $projectCreationString
     Write-Host "Projet créé avec succès : $($response.project.key)"
 } catch {
     Write-Host "Erreur lors de la création du projet : $_"
     exit
 }

# Paramètres pour la création du token
$tokenName = "NomDuToken"  # Remplacez par le nom souhaité pour le token

# Préparation du payload pour la requête
$tokenGenerationPayload = @{
    "name" = $tokenName
}

# Convertit le payload en chaîne de requête pour l'URL (format x-www-form-urlencoded)
$tokenGenerationQueryString = [System.Web.HttpUtility]::ParseQueryString([String]::Empty)
foreach ($key in $tokenGenerationPayload.Keys) {
    $tokenGenerationQueryString[$key] = $tokenGenerationPayload[$key]
}
$tokenGenerationString = $tokenGenerationQueryString.ToString()

# URL pour la génération du token
$sonarqubeTokenGenerationURL = $sonarqubeURL + "/api/user_tokens/generate"

# Envoi de la requête
try {
    $tokenResponse = Invoke-RestMethod -Uri $sonarqubeTokenGenerationURL -Method Post -Headers $headers -ContentType "application/x-www-form-urlencoded" -Body $tokenGenerationString
    Write-Host "Token généré avec succès : $($tokenResponse.token)"
} catch {
    Write-Host "Erreur lors de la génération du token : $_"
    exit
}

# Construit l'image Docker pour le projet Maven
docker build . -t project-rentree-front

# Lance le conteneur Docker du projet Maven sur le réseau personnalisé
docker run --network mon-reseau -p 8080:8080 -d project-rentree-back

# Mise à jour de l'URL de SonarQube pour utiliser l'adresse IP du conteneur
$sonarqubeURL = "http://" + $sonarqubeIP +":9000"

# Affichage des informations pour le débogage
Write-Host "SonarQube URL: $sonarqubeURL"
Write-Host "Sonar Token: $($tokenResponse.token)"

# Commande pour exécuter l'analyse SonarQube à l'intérieur du conteneur Docker
$dockerCommand = "docker run --network mon-reseau -e SONAR_HOST_URL=" + $sonarqubeURL +" -e SONAR_TOKEN=" + $tokenResponse.token + "  project-rentree-front sonar-scanner"
Invoke-Expression $dockerCommand