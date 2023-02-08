FROM node:19

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY src /app/src

WORKDIR /app
RUN npm install;

WORKDIR /app/src

CMD node server.js
