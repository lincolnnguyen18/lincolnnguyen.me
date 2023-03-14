FROM --platform=linux/amd64 node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add --no-cache ffmpeg
RUN npm install --global nodemon
RUN npm install
COPY . .
RUN npx prisma generate

EXPOSE 80
ENV NODE_ENV=prod
CMD [ "nodemon", "index.js" ]
