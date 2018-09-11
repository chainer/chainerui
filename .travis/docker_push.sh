#!/bin/bash
export CHAINERUI_LATEST_VER=`git describe --abbrev=0 --tags`
echo "$CHAINERUI_LATEST_VER"
echo "$DOCKERHUB_MAINTAINER_PASS" | docker login -u "$DOCKERHUB_MAINTAINER_NAME" --password-stdin
docker build -t chainer/chainerui:"$CHAINERUI_LATEST_VER" -f docker/Dockerfile .
docker push chainer/chainerui:"$CHAINERUI_LATEST_VER"
