FROM node:16.0.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN chmod 777 /app/node_modules
CMD ["npm","start"]