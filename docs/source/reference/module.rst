.. _module_:

Module Reference
================

Trainer extensions
------------------

.. _module_command_extension:

.. autoclass:: chainerui.extensions.CommandsExtension


.. _module_summary:

Asset summaries
---------------

.. _module_summary_set_out:

.. autofunction:: chainerui.summary.set_out


.. _module_summary_image:

.. autofunction:: chainerui.summary.image


.. _module_summary_audio:

.. autofunction:: chainerui.summary.audio

.. _module_summary_text:

.. autofunction:: chainerui.summary.text


.. _module_summary_reporter:

.. autofunction:: chainerui.summary.reporter
.. automethod:: chainerui.summary._Reporter.image
.. automethod:: chainerui.summary._Reporter.audio
.. automethod:: chainerui.summary._Reporter.text


.. _module_web_client:

Web client
----------

.. _module_web_client_log:

.. autofunction:: chainerui.init
.. autofunction:: chainerui.log_reporter
.. autofunction:: chainerui.log


Utilities
---------

.. _module_log_report:

.. autoclass:: chainerui.utils.LogReport
   :members:

.. _module_save_args:

.. autofunction:: chainerui.utils.save_args


External library support
------------------------

.. _module_ignite_output_handler:

.. autoclass:: chainerui.contrib.ignite.handler.OutputHandler
   :members:

.. _module_ignite_logger:

.. autoclass:: chainerui.contrib.ignite.handler.ChainerUILogger
