.. _use_external_db:

Use external database
=====================

ChainerUI provides ``--db`` option and supports ``CHAINERUI_DB_URL`` variable to use external database instead of ChainerUI's default database. Sub-commands, ``db``, ``project`` and ``server`` look up a value of the database URL in the following order.

1. command option: ``--db``
2. environment variable: ``CHAINERUI_DB_URL``
3. default database


In the below commands, for example, ChainerUI use ``ANOTHER_DB``::

  $ export CHAINERUI_DB_URL=YOUR_DB
  $ chainerui --db ANOTHER_DB server
  $ # the server will run with ANOTHER_DB, not use YOUR_DB


.. note::

   On default, ChainerUI uses SQLite. The database file is placed at ``~/.chainerui/db``.


.. note::

   If use external database, ``chainerui db create`` is not required for setup.



Supported database types depend on SQLAlchemy, please see `Dialect <http://docs.sqlalchemy.org/en/latest/dialects/index.html>`__ section and setup appropriate driver for the database. The following sections are examples to setup database and connect with them.


.. note::

   ``--db`` option value have to be set on each ``db``, ``project`` and ``server`` sub-commands when use external database::

     $ chainerui --db YOUR_DB db upgrade
     
     $ # chainerui project create -d PROJECT_DIR # <- *NOT* use YOUR_DB
     $ chainerui --db YOUR_DB project create -d PROJECT_DIR

     $ # chainerui server  # <- *NOT* use YOUR_DB
     $ chainerui --db YOUR_DB server

  On the other hand, once ``CHAINERUI_DB_URL`` is set as environment variable, the database URL is shared between other sub-commands.


Example: SQLite
---------------

When use SQLite with an original database file placed at ``/path/to/original.db``, database URL is ``sqlite:////path/to/original.db``::

  $ export CHAINERUI_DB_URL=sqlite:////path/to/original.db
  $ chainerui db upgrade
  $ chainerui server


Example: PostgreSQL
-------------------

The below example uses ``psycopg2`` and ``postgres:10.5`` docker image::

  $ docker pull postgres:10.5
  $ docker run --name postgresql -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -d postgres:10.5

  $ pip install psycopg2-binary
  $ export CHAINERUI_DB_URL=postgresql://user:pass@localhost:5432
  $ chainerui db upgrade
  $ chainerui server


Example: MySQL
--------------

The below example uses ``mysqlclient`` and ``mysql:8.0.12`` docker image::

  $ docker pull mysql:8.0.12
  $ docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root_pass -e MYSQL_USER=user -e MYSQL_PASSWORD=pass -e MYSQL_DATABASE=chainerui -d mysql:8.0.12

  $ pip install mysqlclient
  $ export CHAINERUI_DB_URL=mysql+mysqldb://user:pass@127.0.0.1:3306/chainerui
  $ chainerui db upgrade
  $ chainerui server
