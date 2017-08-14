# intern-chainer-ui

## Server side
### Usage
```
pip install -r requirements.txt
cd chainer_ui
export CHAINER_UI_TARGET_ROOT=path/to/experiments
python main.py
```

### Directory Structure example
```
CHAINER_UI_TARGET_ROOT
├── mnist
|    ├── train_mnist.py
|    └── results
|        ├── 1
|        |    ├── args
|        |    └── log
|        ├── 2
|        |    ├── args
|        |    └── log
|        └── xyz
|             ├── args
|             └── log
└── cifar
    ├── train_cifar.py
    ├── models
    └── results
        └── abc
            ├── args
            └── log
```
