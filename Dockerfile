FROM node:22-alpine
WORKDIR /app

COPY . .
RUN yarn install

CMD ["yarn", "run", "dev", "--host"]
