FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm i nodemon -g
COPY ./ ./
EXPOSE 8000

CMD ["nodemon", "src/index.js"]