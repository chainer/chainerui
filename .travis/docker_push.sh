#!/bin/bash
echo "$TRAVIS_TAG"
echo "$DOCKERHUB_MAINTAINER_PASS" | docker login -u "$DOCKERHUB_MAINTAINER_NAME" --password-stdin
docker build -t chainer/chainerui:"$TRAVIS_TAG" -f docker/Dockerfile .
docker push chainer/chainerui:"$TRAVIS_TAG"
