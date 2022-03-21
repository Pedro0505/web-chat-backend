FROM node:alpine

COPY . /server

WORKDIR /server

RUN npm install

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
