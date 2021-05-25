FROM node:12.18.3

LABEL version="1.0"
LABEL description="testm backend API"
LABEL maintainer = ["davidkjidmo@gmail.com"]

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN ls
RUN yarn install --production
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]