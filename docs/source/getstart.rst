.. _getstart:

Getting started
===============

Create database
---------------

::

  $ chainerui db create
  $ chainerui db upgrade

On default, ``~/.chainerui/db/chainerui.db`` is created.

Drop database
~~~~~~~~~~~~~

::

  $ chainerui db drop

All cached results will be removed.


Create a project
----------------

::

  $ chainerui project create -d PROJECT_DIR [-n PROJECT_NAME]

The ChainerUI server watches the below files under the project directory recursively.

* log: a JSON file created by `LogReport <https://docs.chainer.org/en/v3/reference/generated/chainer.training.extensions.LogReport.html>`__ extension.
* args: (optional) a JSON file, which includes key-value pairs you want to see on ChainerUI along with logs. See `save_args <https://github.com/chainer/chainerui/blob/master/chainerui/utils/save_args.py>`__, util function to dump command line arguments or dictionary to ``args`` file.
* commands: (optional) a JSON file, which is automatically created by `CommandsExtension <https://github.com/chainer/chainerui/blob/master/chainerui/extensions/commands_extension.py>`__. This is a file for ChainerUI server to communicate to operate the target training loop.

For example, file and directory structure is the below and when create a project with ``-d path/to/result``, the results of the two directories, ``result1`` and ``result2`` are registered under the ``PROJECT_NAME`` then ChainerUI gathers the two automatically and continuously.::

  path/to/result/result1
    |--- log       # show values on chart
    |--- args      # show parameters on result table as experimental conditions
    |--- commands
    |--- ...
  path/to/result/result2
    |--- log
    |--- args
    |--- commands
    |--- ...


Start ChainerUI server
----------------------

::

  $ chainerui server

Open http://localhost:5000/ . To stop, press ``Ctrl+C`` on the console.


Customize training loop
-----------------------

TODO: log, args, commands

.. note::

   `examples/train_mnist.py <https://github.com/chainer/chainerui/blob/master/examples/train_mnist.py>`__, based on `chainer/examples/mnist/train_mnist.py <https://github.com/chainer/chainer/blob/4de98cf90e747940f1dd7f7f4cdf1fcc0b4b4786/examples/mnist/train_mnist.py>`__, is a useful example to see how to set save_args and CommandsExtension on training script.
