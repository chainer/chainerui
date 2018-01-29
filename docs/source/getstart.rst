.. _getstart:

Getting started
===============

Create a database
-----------------

Please setup database at first::

  $ chainerui db create
  $ chainerui db upgrade


Create a project
----------------

::

  $ chainerui project create -d PROJECT_DIR [-n PROJECT_NAME]

The ChainerUI server watches the files below the project directory recursively.

* ``log``: Used for chart.
* ``args``: (optional) Used for :ref:`result table <ui_training_job_table>`, show as experimental conditions.
* ``commands``: (optional) Created by :ref:`CommandsExtension <module_command_extension>` internally, used for operating training job.

For more detail of the files and how to setup training loop, see :ref:`getstart_customize_training_loop`

For example, look at the file and directory structure below. When create a project with ``-d path/to/result``, the results of the two directories, ``result1`` and ``result2`` are registered under the ``PROJECT_DIR`` (or ``PROJECT_NAME``) automatically, then ChainerUI continuously gathers the both logs.::

  path/to/result/result1
    |--- log       # show values on chart
    |--- args      # show parameters on result table as experimental conditions
    |--- commands  # created by CommandsExtension to operate the training loop
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

Open http://localhost:5000/ . To stop, press ``Ctrl+C`` on the console. When use original host or port, see :ref:`command option <cmd_server>`:


.. _getstart_customize_training_loop:

Customize training loop
-----------------------

ChainerUI basically supports the `Trainer module <https://docs.chainer.org/en/stable/tutorial/trainer.html>`__ included in Chainer, and some functions without ``Trainer``.

.. note::

   `examples/train_mnist.py <https://github.com/chainer/chainerui/blob/master/examples/train_mnist.py>`__, based on `chainer/examples/mnist/train_mnist.py <https://github.com/chainer/chainer/blob/4de98cf90e747940f1dd7f7f4cdf1fcc0b4b4786/examples/mnist/train_mnist.py>`__, is a useful example to see how to set training loops with ChainerUI.

.. note::

   `examples/train_mnist_custom_loop.py <https://github.com/chainer/chainerui/blob/master/examples/train_mnist_custom_loop.py>`__ is an example, basaed on `chainer/examples/mnist/train_mnist_custom_loop <https://github.com/chainer/chainer/blob/e2fe6f8023e635f8c1fc9c89e85d075ebd50c529/examples/mnist/train_mnist_custom_loop.py>`__, which does not use the training loop from ``Trainer``. However, this example will not use the training loop from :ref:`result page <ui_result_page>`.

Training log
~~~~~~~~~~~~

.. image:: ../images/chart_with_y_sample.png

ChainerUI plots training log values read from  the ``log`` files and shows the training job. The ``log`` file is a JSON file created by `LogReport <https://docs.chainer.org/en/v3/reference/generated/chainer.training.extensions.LogReport.html>`__ extension or :ref:`chainerui's LogReport <module_log_report>`, which is registered automatically and created under the project path. If ``log`` files are updated, the chart and results table are also updated continuously.

* ``epoch``, ``iteration`` or ``elapsed_time`` is used as X-axis, selected on ``xAxis`` pane. These parameters are set automatically by `LogReport <https://docs.chainer.org/en/v3/reference/generated/chainer.training.extensions.LogReport.html>`__
    
    * if using :ref:`chainerui's LogReport <module_log_report>`, only the ``elapsed_time`` is set.

* The other key-value items are plotted.

Setup example from a brief  `MNIST example <https://github.com/chainer/chainerui/blob/master/examples/train_mnist.py>`__:

.. code-block:: python

  import chainer.links as L
  from chainer import training
  from chainer.training import extensions

  def main():
      # Classifier reports softmax cross entropy loss and accuracy at every
      # iteration
      # [ChainerUI] plot loss and accuracy reported by this link
      model = L.Classifier(MLP(args.unit, 10))

      trainer = training.Trainer(updater, (args.epoch, 'epoch'), out=args.out)

      # [ChainerUI] read 'log' file for plotting values
      trainer.extend(extensions.LogReport())

Created ``log`` file example::

  [
      {
          "main/loss": 0.1933198869228363,
          "validation/main/loss": 0.09147150814533234,
          "iteration": 600,
          "elapsed_time": 16.052587032318115,
          "epoch": 1,
          "main/accuracy": 0.9421835541725159,
          "validation/main/accuracy": 0.9703000783920288
      }, 
      {
          "main/loss": 0.07222291827201843,
          "validation/main/loss": 0.08141259849071503,
          "iteration": 1200,
          "elapsed_time": 19.54666304588318,
          "epoch": 2,
          "main/accuracy": 0.9771820902824402,
          "validation/main/accuracy": 0.975399911403656
      },
      ...
  ]

A example without ``Trainer`` code, from a short extract of the `MNIST custom loop example <https://github.com/chainer/chainerui/blob/master/examples/train_mnist_custom_loop.py>`__:

.. code-block:: python

  from chainerui.utils import LogReport

  def main():

      # [ChainerUI] setup log reporter to show on ChainerUI along with 'args'
      ui_report = LogReport(args.out, conditions=args)
      while train_iter.epoch < args.epoch:

          # ...train calculation

          if train_iter.is_new_epoch:

              # [ChainerUI] write values to 'log' file
              stats = {
                  'epoch': train_iter.epoch,
                  'iteration': train_iter.epoch * args.batchsize,
                  'train/loss': train_loss, 'train/accuracy': train_accuracy,
                  'test/loss': test_loss, 'test/accuracy': test_accuracy
                  }
              ui_report(stats)

.. note::

   :ref:`chainerui's LogReport <module_log_report>` only sets ``exampled_time``, so train loop has to set ``epoch`` and ``iteration`` manually.

Experimental conditions
~~~~~~~~~~~~~~~~~~~~~~~

.. image:: ../images/result_table_condition_sample.png

ChainerUI shows the training job with experimental conditions read from the ``args`` file. ``args`` file is a JSON file, which includes key-value pairs. See :ref:`save_args <module_save_args>`, util function to dump command line arguments or dictionaries to ``args`` file.

Setup example of a brief `MNIST example <https://github.com/chainer/chainerui/blob/master/examples/train_mnist.py>`__:

.. code-block:: python

  # [ChainerUI] import chainerui util function
  from chainerui.utils import save_args

  def main():
      parser.add_argument('--out', '-o', default='result',
                          help='Directory to output the result')
      args = parser.parse_args()

      # [ChainerUI] save 'args' to show experimental conditions
      save_args(args, args.out)

Here is an ``args`` file examples, with values shown as experimental conditions on a results table::

  {
      "resume": "",
      "batchsize": 100,
      "epoch": 20,
      "frequency": -1,
      "gpu": 0,
      "unit": 1000,
      "out": "results"
  }


.. _getstart_operate_training_loop:

Operate training loop
~~~~~~~~~~~~~~~~~~~~~

.. image:: ../images/result_page_operation_block.png

ChainerUI supports operating a training loop with :ref:`CommandsExtension <module_command_extension>`. The latest version supports:

* Taking snapshot
* Adjusting the hyperparameters of an optimizer
* Stopping the training loop

Operation buttons are in :ref:`result page <ui_result_page>`.

Setup example of a brief extract `MNIST example <https://github.com/chainer/chainerui/blob/master/examples/train_mnist.py>`__:

.. code-block:: python

  from chainer import training
  from chainer.training import extensions

  # [ChainerUI] import CommandsExtension
  from chainerui.extensions import CommandsExtension

  def main():
      trainer = training.Trainer(updater, (args.epoch, 'epoch'), out=args.out)

      # [ChainerUI] Observe learning rate
      trainer.extend(extensions.observe_lr())
      # [ChainerUI] enable to send commands from ChainerUI
      trainer.extend(CommandsExtension())

.. note::

   This operation of a training loop is from the :ref:`CommandsExtension <module_command_extension>` which requires ``Trainer``. A training loop without ``Trainer`` cannot use this function.

.. note::

   Adjusting the pyperparameters supports only `MomentumSGD <https://docs.chainer.org/en/stable/reference/generated/chainer.optimizers.MomentumSGD.html#chainer.optimizers.MomentumSGD>`__.
