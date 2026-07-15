FROM node:26-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .


CMD [ "node", "--watch" ,"app.js" ]