FROM node:16-slim

WORKDIR /app

COPY package.json .

RUN npm install && npm cache clean --force

COPY . .

# EXPOSE 3000

CMD ["npm", "run", "build"]

# CMD ["npm", "start"]