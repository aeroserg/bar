FROM node:alpine

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm install serve -g
RUN npm install jquery --save
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]