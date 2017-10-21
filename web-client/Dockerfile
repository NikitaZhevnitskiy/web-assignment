FROM node:8
RUN mkdir -p /app
COPY public /app/public/
COPY src /app/src/
COPY package.json /app
WORKDIR "/app"
RUN npm install
ENTRYPOINT npm run start