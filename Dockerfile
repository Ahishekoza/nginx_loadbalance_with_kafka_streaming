FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .
# CMD COMMENT NEW
CMD [ "npm","run","start:logs" ]
