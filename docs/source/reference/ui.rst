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

Home: Project list
------------------

.. image:: ../../images/home_project_list.png

List of registered projects, select a project, transition to the project page. When register a project within running server, refresh the page and will show the project on the list. See :ref:`getstart_customize_training_loop`.

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

Training job table shows brief log information and experimental conditions. Job name are set directory name on default, enabled to edit the name on table directly. To unregister a result, click X button at the right end of the training job table.

.. note::

   [Known problem] If unregister a result once, cannot restore the same name result on the result table. It will be fixed in future.


.. _ui_detail_page:

Result: Show detail information of result
-----------------------------------------

.. image:: ../../images/result_detail.png

Show detail information of the training job, and support to operate the training loop.
