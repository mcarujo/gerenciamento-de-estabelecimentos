FROM node

RUN apt-get update -y && \
    apt install -y git

RUN git clone --branch front-end https://github.com/mcarujo/gerenciamento-de-estabelecimentos.git /app

WORKDIR /app/my-app/

RUN npm install

EXPOSE 3000