.. _install_guide:

Installation Guide
==================

Dependencies
------------

ChainerUI is developed under Python 2.7+, 3.5+, 3.6+, 3.7+. For other requirements, see ``requirements.txt``.

.. literalinclude:: ../../requirements.txt
  :caption: requirements.txt

ChainerUI uses ``sqlite3`` module which is included in the standard Python library. If Python is built from source, ``sqlite3`` must be installed before building Python.

* On Ubuntu, ``libsqlite3-dev`` must be installed before building Python (``$ apt-get install libsqlite3-dev``).
* On Windows, install Visual C++ Build Tools with the Default Install setting before building Python.

Install ChainerUI
-----------------

Install ChainerUI via PyPI
~~~~~~~~~~~~~~~~~~~~~~~~~~

To install ChainerUI, use ``pip``::

  $ pip install chainerui

Install ChainerUI from source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To install ChaineruI from source, build from a cloned Git repository. Frontend module requires ``npm`` 6.2.0+::

  $ git clone https://github.com/chainer/chainerui.git
  $ cd chainerui/frontend
  $ npm install && npm run build && cd ..
  $ pip install -e .


Quick start
-----------

Initialize ChainerUI database::

  $ chainerui db create
  $ chainerui db upgrade

Clone examples of train log and create a project::

  $ git clone https://github.com/chainer/chainerui.git
  $ cd chainerui

  $ # create example project project
  $ chainerui project create -d examples/log-file -n example-project

Run ChainerUI server::

  $ chainerui server

Open http://localhost:5000/ and select "example-project", then shown a chart of training logs.

For more detailed usage, see :ref:`getstart`.


.. _install_guide_docker:

Docker start
------------

Get Docker container from `DockerHub <https://hub.docker.com/r/chainer/chainerui/>`__ and start ChainerUI server. The container has installed ChainerUI module, setup a DB and a command to start the server::

  $ git clone https://github.com/chainer/chainerui.git
  $ cd chainerui

  $ # replace tag to the latest version number
  $ docker pull chainer/chainerui:latest
  $ docker run -d -p 5000:5000 --name chainerui chainer/chainerui:latest
  $ # then ChainerUI server is running

Open http://localhost:5000/ shown empty project list.

Form more detailed usage, see :ref:`getstart` or :ref:`web_api`.


Browser compatibility
---------------------

ChainerUI is supported by the latest stable version of the following browsers.

* Firefox
* Chrome
