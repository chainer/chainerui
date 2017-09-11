# Chainer UI

Chainer UI is a visualization and management tool for chainer.

## Installation

```sh
git clone git@github.com:pfn-intern/intern-chainer-ui.git
cd intern-chainer-ui
pip install -e .
chainer-ui db create
chainer-ui db upgrade
```

## Quick start

```sh
cd intern-chainer-ui

# run Chainer UI server
chainer-ui server -d .
```

or 


```sh
cd intern-chainer-ui

# register sample result directories
chainer-ui register -d _extension/example_results/18003
chainer-ui register -d _extension/example_results/18948
chainer-ui register -d _extension/example_results/19204
chainer-ui register -d _extension/example_results/19205
chainer-ui register -d _extension/example_results/19208

# run Chainer UI server
chainer-ui server
```

Then open http://localhost:5000/ .


## Usage

### Register result directories

```sh
chainer-ui register -d path/to/result
```

The Chainer UI server watches two files under the registerd directories.

- `log`: a json file created by `LogReport` extension.
- `args`: *(optional)* a json file, which includes key-value pairs you want to see on Chainer UI along with logs. See [`args_report.py`](https://github.com/pfn-intern/intern-chainer-ui/tree/master/_extension) for a sample extension to dump command line arguments to `args` file.

```
path/to/result
├── log
├── args
```

### Start Chainer UI server

```sh
chainer-ui server
```

Then open http://localhost:5000/ .


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



