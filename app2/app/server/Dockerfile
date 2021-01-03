FROM node:14.15-alpine3.12
#FROM node:12.20.0-alpine3.9

WORKDIR /app
COPY package.json ./
# RUN npm install --only=prod --silent
RUN npm install --silent
COPY ./ ./
CMD ["npm", "run", "start"]