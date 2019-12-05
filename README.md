# ChainerUI

[![PyPI](https://img.shields.io/pypi/v/chainerui.svg)](https://pypi.python.org/pypi/chainerui)
[![Build Status](https://travis-ci.org/chainer/chainerui.svg?branch=master)](https://travis-ci.org/chainer/chainerui)
[![Build status](https://ci.appveyor.com/api/projects/status/bag5tjue689nxj4v/branch/master?svg=true)](https://ci.appveyor.com/project/disktnk/chainerui-1iviy/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/chainer/chainerui/badge.svg)](https://coveralls.io/github/chainer/chainerui)
[![Documentation Status](https://readthedocs.org/projects/chainerui/badge/?version=latest)](http://chainerui.readthedocs.io/en/latest/?badge=latest)

![training_captures](https://raw.githubusercontent.com/chainer/chainerui/master/docs/images/project_training_animation.gif)

ChainerUI is a visualization and management tool for [Chainer](https://github.com/chainer/chainer).

## Installation

To install ChainerUI, use `pip`.

```sh
$ pip install chainerui
```

To install ChainerUI from source.

```sh
$ git clone https://github.com/chainer/chainerui.git
$ cd chainerui/frontend
$ npm install && npm run build && cd ..
$ pip install -e .
```

- ChainerUI uses `sqlite3` module which is included in the standard Python library. If Python is built from source, `sqlite3` must be installed before building Python.
    - On Ubuntu, "libsqlite3-dev" must be installed before building Python (`$ apt-get install libsqlite3-dev`).
    - On Windows, install Visual C++ Build Tools with the Default Install setting before building Python.

## Usage

1. output `log` file with `LogReport` extension, see `examples/log-file/train_mnist.py`
1. output `log` file manually, see `examples/log-file/train_mnist_custom_loop.py`
1. post training logs via web API, see `examples/web-api/train_mnist.py`

## Quick start

Initialize ChainerUI database.

```sh
$ chainerui db create
$ chainerui db upgrade
```

Clone examples of train log and create a project.

```sh
$ git clone https://github.com/chainer/chainerui.git
$ cd chainerui

$ # create example project
$ chainerui project create -d examples/log-file -n example-project

$ # run ChainerUI server
$ chainerui server
```

Open http://localhost:5000/ and select "example-project", then shown a chart of training logs.

For more detailed usage, see [getting started](http://chainerui.readthedocs.io/en/latest/getstart.html)

## Docker start

Get Docker container from [DockerHub](https://hub.docker.com/r/chainer/chainerui/) and start ChainerUI server. The container has installed ChainerUI module, setup a DB and a command to start the server.

```sh
$ # replace tag to the latest version number
$ docker pull chainer/chainerui:latest
$ docker run -d -p 5000:5000 --name chainerui chainer/chainerui:latest
$ # then ChainerUI server is running
```

Open http://localhost:5000/, shown empty project list. `examples/web-api/train_mnist.py` is an example to setup project and send logs via web API.

For more detailed usage, see [getting started](http://chainerui.readthedocs.io/en/latest/getstart.html) or [web API](http://chainerui.readthedocs.io/en/latest/webapi.html)

## Browser compatibility

ChainerUI is supported by the latest stable version of the following browsers.

- Firefox
- Chrome

## License

MIT License (see `LICENSE` file).

## Contribution

Any contribution to ChainerUI is welcome!

- Python codes follow the [Chainer contribution guide](https://docs.chainer.org/en/stable/contribution.html).

### Run tests

Install "pytest" package and run test

```sh
$ pytest
```

### Build client side JS

```sh
$ cd frontend
$ npm install
$ npm run build:watch
```
