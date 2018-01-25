.. _ui:

User interface manual
=====================

Page transition flow::

  [Home: Project list]
    -- (select project) ->
      [Project: Show training chart and jobs]
        -- (select result ID) ->
          [Result: Show detail information of result]

Header
------

.. image:: ../../images/header_green.png

.. |header_config| image::  ../../images/header_config.png
   :scale: 50%

.. |header_status_green| image:: ../../images/header_status_green.png
   :scale: 50%

* |header_config| : setup global configuration and show ChainerUI version:
    * select size of a chart
    * select polling interval
    * show ChainerUI version
* |header_status_green| : connection status between ChainerUI server
    * green: success to connect
    * blue: loading
    * red: fail to connect
    * gray: disable polling


.. _ui_home_project_list:

Home: Project list
------------------

.. image:: ../../images/home_project_list.png

From the list of registered projects, select a project to transition to the project page. When registering a project within running server, refresh the page and it will show the project on the list. See :ref:`getstart_customize_training_loop`.

* ``Edit``: edit the project name.
* ``Delete``: delete the project from list.

Project: Show training chart and jobs
-------------------------------------

.. image:: ../../images/project_main.png

Show training logs and experimental conditions.

* Select X-axis value by ``xAxis`` pane.
* Select values by ``yLeftAxis`` and ``yRightAxis`` panes.
* Select training job to show on a chart.


.. _ui_training_job_table:

Training job table
~~~~~~~~~~~~~~~~~~

.. image:: ../../images/result_table_condition_sample.png

The training job table shows brief log information and experimental conditions. Job names are set to the directory name by default The name can be edit directory on the table. To unregister a result, click X button at the right end of the training job table.

.. note::

   [Known problem] Once a result is unregistered, a result with the same name cannot be restored on the result table. This will be fixed in future.


.. _ui_detail_page:

Result: Show detailed information of the results
------------------------------------------------

.. image:: ../../images/result_detail.png

Show detailed information of the training job and support operation of the training loop.

Commands pane
~~~~~~~~~~~~~

Operation buttons in ``Commands`` pane allow users to operate the training job. To enable these buttons, the trining job is required to set :ref:`CommandsExtension <module_command_extension>` and click them within running the job. For more detail of how to set the extension, see :ref:`getstart_operate_training_loop`.

**Take snapshot**

Save a training model to the file in NPZ format with using `save_napz <https://docs.chainer.org/en/stable/reference/generated/chainer.serializers.save_npz.html>`__ By default, ``snapshot_iter_{.updater.iteration}`` file is saved to the result path.

**Adjust**

Adjust the hyperparameters of an optimizer. This function supports only `MomentumSGD <https://docs.chainer.org/en/stable/reference/generated/chainer.optimizers.MomentumSGD.html#chainer.optimizers.MomentumSGD>`__ optimizer.

**Stop**

Stop the trining loop.

**Command history**

The command history is shown on the down of the pane.
