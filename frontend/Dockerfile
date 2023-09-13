FROM node:16-slim

WORKDIR /app

COPY package.json .

RUN npm install && npm cache clean --force

COPY . .

# EXPOSE 3000

RUN npm run build

# CMD ["npm", "run", "build"]

ENTRYPOINT ["tail", "-f", "/dev/null"]