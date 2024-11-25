FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache mkdocs git

COPY . .

RUN yarn install

CMD ["yarn", "run", "dev", "--host"]
