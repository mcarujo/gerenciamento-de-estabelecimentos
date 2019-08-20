FROM debian:9-slim

RUN apt-get update -y && \
    apt install -y python3 \
    python3-pip \
    python3-mysql.connector \
    python3-mysqldb \
    git

RUN pip3 install flask \
    flask-migrate \
    flask-mysqldb \
    flask-script \
    faker \
    wtforms \
    flask-cors \
    wtforms_json

RUN git clone --branch back-end https://github.com/mcarujo/gerenciamento-de-estabelecimentos.git /app

WORKDIR /app/my-apirest

COPY start.sh .

RUN chmod +x start.sh

EXPOSE 3000