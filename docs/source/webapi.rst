.. _web_api:

Use web API
===========

Send training logs via web API. 


Start ChainerUI server
----------------------

::

  $ chainerui server

Open http://localhost:5000/ . To stop, press ``Ctrl+C`` on the console. When use original host or port, see :ref:`command option <cmd_server>`. 

Or, use ChainerUI's docker container to run ChainerUI server, see :ref:`docker start <install_guide_docker>`


Customize training loop
-----------------------

Setup example from a brief  `MNIST example <https://github.com/chainer/chainerui/blob/master/examples/web-api/train_mnist.py>`__:

.. code-block:: python

  import chainerui

  def main():
      args = parser.parse_args()

      # [ChainerUI] To use ChainerUI web client, must initialize
      # args will be shown as parameter of this experiment.
      chainerui.init(conditions=args)

      # Set up a neural network to train
      # Classifier reports softmax cross entropy loss and accuracy at every
      # iteration, which will be used by the PrintReport extension below.
      # [ChainerUI] plot loss and accuracy reported by this link
      model = L.Classifier(MLP(args.unit, 10))

      trainer = training.Trainer(updater, (args.epoch, 'epoch'), out=args.out)

      # [ChainerUI] set log reporter on the extention
      trainer.extend(extensions.LogReport(
          postprocess=chainerui.log_reporter()))

.. note::

   User doesn't have to execute ``$ chainerui project create`` command. ``chainerui.init()`` add a project using current directory on the first running. Project name can be customized using ``project_name`` option. Training results wil be created every running. Result name is set timestamp automatically and can be customized via web UI.
