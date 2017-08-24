# intern-chainer-ui


## Installation

```sh
git clone git@github.com:pfn-intern/intern-chainer-ui.git
cd intern-chainer-ui
pip install -r requirements.txt
```

## Usage

### Register result directories

```sh
cd chainer_ui
python register.py path/to/result
```

The Chainer UI server watches two files under the registerd directories.

- `log`: a json file crested by `LogReport` extension.
- `args`: *(optional)* a json file, which includes key-value pairs you want to see on Chainer UI along with logs. See [`ArgsReport`](https://github.com/pfn-intern/intern-chainer-ui/tree/master/_extension) for details.

```
path/to/result
├── log
├── args
```

### Start Chainer UI server

```sh
python main.py
```

Then open http://localhost:5000/ .


## Client side (only for development)

```sh
cd frontend
npm install
npm run build:watch
```


