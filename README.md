# ChainerUI

[![PyPI](https://img.shields.io/pypi/v/chainerui.svg)](https://pypi.python.org/pypi/chainerui)
[![Build Status](https://travis-ci.org/chainer/chainerui.svg?branch=master)](https://travis-ci.org/chainer/chainerui)
[![Coverage Status](https://coveralls.io/repos/github/chainer/chainerui/badge.svg)](https://coveralls.io/github/chainer/chainerui)
[![Documentation Status](https://readthedocs.org/projects/chainerui/badge/?version=latest)](http://chainerui.readthedocs.io/en/latest/?badge=latest)

![training_captures](https://user-images.githubusercontent.com/414255/34244148-637e6630-e667-11e7-8a6b-9a857fa806bc.gif)

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
$ python setup.py install
```

- ChainerUI uses `sqlite3` module which is included in the standard Python library. If Python is built from source, `sqlite3` must be installed before building Python.
    - On Ubuntu, "libsqlite3-dev" must be installed before building Python (`$ apt-get install libsqlite3-dev`).
    - On Windows, install Visual C++ Build Tools with the Default Install setting before building Python.

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

$ # create your first project
$ chainerui project create -d examples -n example-project

$ # run ChainerUI server
$ chainerui server
```

Open http://localhost:5000/ and select "example-project".

For more detailed usage, see [getting started](http://chainerui.readthedocs.io/en/latest/getstart.html)

## Browser compatibility

ChainerUI is supported by the latest stable version of the following browsers.

- Firefox
- Chrome

## License

[MIT License](LICENSE)

## Contribution

Any contribution to ChainerUI is welcome!

- Python codes follow the [Chainer contribution guide](https://docs.chainer.org/en/stable/contribution.html).

### Run tests

Install "pytest" package and run test

```sh
$ CHAINERUI_ENV=test pytest
```

### Build client side JS

```sh
$ cd frontend
$ npm install
$ npm run build:watch
```
