# intern-chainer-ui

## Server side
### Usage
```
pip install -r requirements.txt
cd chainer_ui
python main.py -d path/to/experiments
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
