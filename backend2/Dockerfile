FROM --platform=linux/arm64 node:16-alpine

# source env variables
COPY .env.production /app/
WORKDIR /app
RUN source .env.production

# install dependencies and build app
COPY package*.json ./
RUN npm install --global nodemon
RUN npm install
COPY . .
RUN npm run build

# expose port and start app
EXPOSE $PORT
ENV NODE_ENV=production
CMD ["npm", "run", "start:prod"]
