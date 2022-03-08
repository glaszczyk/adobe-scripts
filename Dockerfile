FROM node:latest

WORKDIR /app

COPY ["package.json", "tsconfig.json", "./"]

RUN npm install
