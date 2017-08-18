# intern-chainer-ui

## Server side

### Usage
flaskサーバの起動
```
pip install -r requirements.txt
cd chainer_ui
python main.py
```

監視するログファイルの追加 
```
python register.py path/to/result
```

追加すると、path/to/result直下の`log`と`args`を監視します。
```
path/to/result
├── log
├── args
```

## Client side (only for development)

```bash
cd frontend
npm install
npm run build:watch
```

