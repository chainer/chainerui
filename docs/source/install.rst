.. _install-guilde:

Installation Guide
==================

Dependencies
------------

ChainerUI is developed under Python 2.7+, 3.5+, 3.6+. For other requirement, see ``requirements.txt``.

.. literalinclude:: ../../requirements.txt
  :caption: requirements.txt

ChainerUI uses ``sqlite3`` module which is included in the standard Python library. If Python is built from source, need to enable ``sqlite3`` module before building Python.

* On Ubuntu, need to install ``libsqlite3-dev`` (``$ apt-get install libsqlite3-dev``) before building Python.
* On Windows, install Visual C++ Build Tools with the Default Install setting, before building Python.

Install ChainerUI
-----------------

Install ChainerUI via PyPI
~~~~~~~~~~~~~~~~~~~~~~~~~~

To install ChainerUI, use ``pip``::

  $ pip install chainerui

Install ChainerUI from source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To install ChaineruI from source, build from a cloned Git repository. Frontend module requires ``npm`` 5.6.0+::

  $ git clone https://github.com/chainer/chainerui.git
  $ cd chainerui/frontend
  $ npm install && npm run build && cd ..
  $ python setup.py install


Quick start
-----------

Initialize ChainerUI database::

  $ chainerui db create
  $ chainerui db upgrade

Clone examples of train log and create a project::

  $ git clone https://github.com/chainer/chainerui.git
  $ cd chainerui

  $ # create your first project
  $ chainerui project create -d examples -n example-project

Run ChainerUI server::

  $ chainerui server

Open http://localhost:5000/ and select "example-project", then show a chart of training logs.


Browser compatibility
---------------------

ChainerUI is supported by the latest stable version of the following browser.

* Firefox
* Chrome
