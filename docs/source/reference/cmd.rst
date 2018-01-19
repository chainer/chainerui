.. _cmd:

ChainerUI command manual
========================

.. _cmd_server:

Server
------

Run the ChainerUI server. To stop, press ``Ctrl+C`` on the console::

  $ chainerui server

* ``--host`` or ``-H``: (optional) set original host name
* ``--port`` or ``-p``: (optional) set original port number, set ``5000`` on default
* ``--debug`` or ``-d``: (optional) run server with debug mode


.. _cmd_database:

Database
--------

Create a ChainerUI database. ChainerUI creates ``~/.chainerui/db/chainerui.db`` by default and the database references the file::

  $ chainerui db create

Setup the schema for ChainerUI. The ``upgrade`` operation is always necessary when creating a new database or changing the schema on version up::

  $ chainerui db upgrade

Drop **all** records from database. If continuing to use ChainerUI after executing ``drop``, the ``create`` and ``upgrade`` operations must be executed.::

  $ chainerui db drop

.. warning::

   When removing selected projects, don't use the ``drop`` commands. Use ``Delete`` button on :ref:`project list page <ui_home_project_list>`.


.. _cmd_project:

Project
-------

ChainerUI manages multiple projects and each project manages multiple training logs. Once a project directory is created, ChainerUI starts to monitor the directory and register log files under the directory. The searching process is run recursively and nested directories are available::

  $ chainerui project create -d PROJECT_DIR

* ``-d``: (required) target path
* ``-n``: (optional) name of project. use directory name on default.
