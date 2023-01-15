FROM node:16.0.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
RUN chmod -R 777 node_modules/
COPY . .
CMD ["npm","start"]