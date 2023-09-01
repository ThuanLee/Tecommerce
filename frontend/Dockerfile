FROM node:16-slim

ENV CI=true

WORKDIR /app

COPY package.json .

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"]