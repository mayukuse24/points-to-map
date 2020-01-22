FROM node:10.17.0-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 4200
CMD ["npm","start"]