FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .
# CMD COMMENT
CMD [ "npm","run","start:logs" ]
