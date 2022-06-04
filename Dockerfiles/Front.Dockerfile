FROM node

WORKDIR /usr/src/Front

EXPOSE 8080


CMD	 npm install; node index.js;
