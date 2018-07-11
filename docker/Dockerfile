FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    python3-dev \
    python3-pip \
    python3-wheel \
    python3-setuptools && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

RUN pip3 install chainerui
RUN chainerui db create && chainerui db upgrade

EXPOSE 5000
RUN mkdir /projects
VOLUME ["/projects"]
CMD ["chainerui", "server", "--host", "0.0.0.0"]
