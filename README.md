# Chainer UI

Chainer UI is a visualization and management tool for chainer.

## Installation

```sh
git clone git@github.com:pfn-intern/intern-chainer-ui.git
cd intern-chainer-ui
python setup.py install
chainer-ui db create
chainer-ui db upgrade
```

### On Ubuntu
Please install libsqlite3-dev package before build python.

```
sudo apt-get install libsqlite3-dev
```

### On Windows
Please install Visual C++ Build Tools (using the Default Install setting) before `python setup.py install`.


## Quick start

```sh
cd intern-chainer-ui

# create your first project
chainer-ui project create -d examples -n my-project

# run Chainer UI server
chainer-ui server
```

Then open http://localhost:5000/ .


## Usage

### Create a project

```sh
chainer-ui project create -d PROJECT_DIR [-n PROJECT_NAME]
```

The Chainer UI server watches some files under the project directory recursively.

- `log`: a json file created by `LogReport` extension.
- `args`: *(optional)* a json file, which includes key-value pairs you want to see on Chainer UI along with logs. See [`args_report.py`](https://github.com/pfn-intern/intern-chainer-ui/blob/master/chainerui/extensions/args_report.py) for a sample extension to dump command line arguments to `args` file.
- `commands`: *(optional)* a json file, which is automatically created by [`CommandsExtension`](https://github.com/pfn-intern/intern-chainer-ui/blob/master/chainerui/extensions/commands_extension.py) . This is a file for Chainer UI server to communicate with `CommandsExtension` .

```
path/to/result
├── log
├── args
├── commands
```

### Start Chainer UI server

```sh
chainer-ui server
```

Then open http://localhost:5000/ .

### Unregister results

When you want to unregister a result, click `X` button at the right end of the result table in http://localhost:5000/ .

When you want to unregister all results, drop and create a new database as follows.

```sh
chainer-ui db drop
chainer-ui db create
chainer-ui db upgrade
```


## Upgrade guide

```sh
cd intern-chainer-ui

# download new version of chainerui
git pull
# install
python setup.py install

# drop the existing database
chainer-ui db drop
# create a new database
chainer-ui db create
chainer-ui db upgrade
```



## Client side (only for development)

```sh
cd frontend
npm install
npm run build:watch
```


## For users

- Clone and try using Chainer UI.
- Any bug reports are welcome. Issue page: https://github.com/pfn-intern/intern-chainer-ui/issues
- Any feature requests are welcome. Slack channel: [#ext-chainer-ui](https://preferred.slack.com/messages/ext-chainer-ui/)
