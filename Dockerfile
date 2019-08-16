FROM debian:9-slim

RUN apt-get update -y && \
    apt install -y python3 \
    python3-pip \
    python3-mysql.connector \
    python3-mysqldb && \
    pip3 install flask \
    flask-migrate \
    flask-mysqldb \
    flask-script \
    faker \
    forms
