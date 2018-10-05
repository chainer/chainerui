#!/bin/bash
echo "$TRAVIS_TAG"
python setup.py sdist
echo "$DOCKERHUB_MAINTAINER_PASS" | docker login -u "$DOCKERHUB_MAINTAINER_NAME" --password-stdin
docker build -t chainer/chainerui:"$TRAVIS_TAG" -f docker/dockerhub/Dockerfile --build-arg CHAINERUI_VERSION="${TRAVIS_TAG:1}" .
docker push chainer/chainerui:"$TRAVIS_TAG"
