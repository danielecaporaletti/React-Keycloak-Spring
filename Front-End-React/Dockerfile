#1. Crea un'immagine temporanea nodework basata su Node.js su Alpine Linux.
#2. Imposta /my-app come directory di lavoro.
#3. Copia il file package.json nella directory di lavoro.
#4. Esegue npm install per installare le dipendenze del progetto.
#5. Copia il resto dei file del progetto nella directory di lavoro.
#6. Esegue npm run build per creare una versione di produzione del progetto.
FROM node:alpine3.16 as nodework
WORKDIR /my-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#1. Crea un'immagine basata su Nginx su Alpine Linux.
#2. Imposta la directory di lavoro sulla directory di contenuto HTML di Nginx.
#3. Rimuove tutti i file esistenti in quella directory.
#4. Copia il default.conf in cui ho aggiunto `try_files $uri $uri/ /index.html;` alla riga 10 per gestire le route con il dom
#5. Copia il build prodotto nell'immagine temporanea nella directory di lavoro.
#6. Imposta l'entrypoint di Nginx in modo che non si avvii come demone.

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=nodework /my-app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
