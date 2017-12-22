# ChainerUI

[![CircleCI](https://circleci.com/gh/chainer/chainerui.svg?style=shield&circle-token=6d21bf61d102538b7be005884676f7305320be1b)](https://circleci.com/gh/chainer/chainerui)

![training_captures](https://user-images.githubusercontent.com/414255/34244148-637e6630-e667-11e7-8a6b-9a857fa806bc.gif)

ChainerUI is a visualization and management tool for [Chainer](https://github.com/chainer/chainer).

## Installation

To install ChainerUI, use `pip`

```sh
$ pip install chainerui
```

Then initialize ChainerUI database.

```sh
$ chainerui db create
$ chainerui db upgrade
```

To install ChainerUI from source

```sh
$ git clone https://github.com/chainer/chainerui.git
$ cd chainerui/frontend
$ npm install && npm run build && cd ..
$ python setup.py install
```

- ChainerUI uses `sqlite3` module which is included in the Python standard library. To enable `sqlite3` module, need to install SQLite library before building Python.
    - on Ubuntu, install "libsqlite3-dev" (`apt-get install libsqlite3-dev`) before building Python
- On Windows, install Visual C++ Build Tools with the Default Install setting, before ChainerUI install.

## Quick start

Try examples.

```sh
$ git clone https://github.com/chainer/chainerui.git
$ cd chainerui

$ # create your first project
$ chainerui project create -d examples -n example-project

$ # run ChainerUI server
$ chainerui server
```

Open http://localhost:5000/ and select "example-project". 

## Usage

### Create a project

```sh
$ chainerui project create -d PROJECT_DIR [-n PROJECT_NAME]
```

The ChainerUI server watches the below files under the project directory recursively.

- `log`: a JSON file created by [`LogReport`](https://docs.chainer.org/en/v3/reference/generated/chainer.training.extensions.LogReport.html) extension.
- `args`: *(optional)* a JSON file, which includes key-value pairs you want to see on ChainerUI along with logs. See [`save_args`](chainerui/utils/save_args.py), util function to dump command line arguments or dictionary to `args` file.
- `commands`: *(optional)* a JSON file, which is automatically created by [`CommandsExtension`](chainerui/extensions/commands_extension.py) . This is a file for ChainerUI server to communicate with `CommandsExtension` .

```
path/to/result
  |--- log
  |--- args
  |--- commands
```

[`examples/train_mnist.py`](examples/train_mnist.py), based on [`chainer/examples/mnist/train_mnist.py`](https://github.com/chainer/chainer/blob/4de98cf90e747940f1dd7f7f4cdf1fcc0b4b4786/examples/mnist/train_mnist.py), is a useful example to see how to set `save_args` and `CommandsExtension` on training script.

### Start ChainerUI server

```sh
$ chainerui server
```

Open http://localhost:5000/ .

### Unregister results

To unregister a result, click `X` button at the right end of the result table. If unregister a result once, cannot restore the same name result on the result table (known problem).

To unregister all results, drop and create a new database as follows.

```sh
$ chainerui db drop
$ chainerui db create
$ chainerui db upgrade
```

## Browser compatibility

ChainerUI is supported by the latest stable version of the following browser.

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
