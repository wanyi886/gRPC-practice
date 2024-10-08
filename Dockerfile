FROM node:16-alpine
EXPOSE 2100
EXPOSE 50052
WORKDIR /gRPC-practice
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
CMD ["npm", "start"]
