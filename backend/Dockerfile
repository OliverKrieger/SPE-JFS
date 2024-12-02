FROM node:18
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN ls -la /app

EXPOSE 5000
CMD ["yarn", "start"]
