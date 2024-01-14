FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

# Mettez à jour les paquets et installez les dépendances nécessaires
RUN apt-get update && apt-get install -y unzip wget

# Définissez la version de sonar-scanner que vous souhaitez installer
ARG SONAR_SCANNER_VERSION=5.0.1.3006

# Téléchargez et décompressez sonar-scanner
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip \
    && unzip sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip -d /opt \
    && rm sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip

# Ajoutez le scanner SonarQube au PATH
ENV PATH="/opt/sonar-scanner-${SONAR_SCANNER_VERSION}-linux/bin:${PATH}"

EXPOSE 19006
CMD tail -f /dev/null