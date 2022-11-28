FROM node

WORKDIR /app

COPY ./producer/package.json /app

RUN npm install

COPY ./producer/ /app

EXPOSE 8080

CMD ["node", "index.js"]