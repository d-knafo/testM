FROM node:12.18.3

LABEL version="1.0"
LABEL description="testm frontend react app"
LABEL maintainer = ["davidkjimdo@gmail.com"]

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]