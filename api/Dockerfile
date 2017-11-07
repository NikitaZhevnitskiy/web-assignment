FROM node:8
WORKDIR /app
COPY . /app
RUN npm install
ENV NODE_ENV=docker
CMD node server.js
EXPOSE 3000