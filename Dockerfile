FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

# set container port to match app default
ENV PORT=8080

COPY . .

EXPOSE 8080

CMD ["npm", "start"]