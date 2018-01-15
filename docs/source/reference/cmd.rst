.. _cmd:

ChainerUI command manual
========================

.. _cmd_server:

Server
------

Run ChainerUI server. To stop, press ``Ctrl+C`` on the console::

  $ chainerui server

* ``--host`` or ``-H``: (optional) set original host name
* ``--port`` or ``-p``: (optional) set original port number, set ``5000`` on default
* ``--debug`` or ``-d``: (optional) run server with debug mode


.. _cmd_database:

Database
--------

Create ChainerUI database. ChainerUI creates ``~/.chainerui/db/chainerui.db`` on default and database references the file::

  $ chainerui db create

Setup schema for ChainerUI. ``upgrade`` operation is always necessary when create new database or change the schema on version up::

  $ chainerui db upgrade

Drop all records from database::

  $ chainerui db drop


.. _cmd_project:

Project
-------

ChainerUI manages multiple projects and each project manages multiple train logs. Once creating a project with a directory, ChainerUI starts to monitor the directory and register log files under the directory. The searching process is run recursively and nested directories are available::

  $ chainerui project create -d PROJECT_DIR

* ``-d``: (required) target path
* ``-n``: (optional) name of project. use directory name on default.
