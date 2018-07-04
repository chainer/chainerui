.. _use_docker:

Use Docker
==========

ChainerUI provides ``Dockerfile`` from version 0.4.0 and ChainerUI server can be run on a Docker container.


Get Docker container
--------------------

The Docker container can be got from `DockerHub <https://hub.docker.com/r/chainer/chainerui/>`__ or built yourself. When getting the container from DockerHub, set the latest version to the tag. The below code gets version 0.4.0::

  $ docker pull chainer/chainerui:v0.4.0

When building Docker container yourself, user ``Dockerfile`` placed in docker directory::

  $ git clone https://github.com/chainer/chainerui.git
  $ cd chainerui
  $ docker build -t chainer/chainerui:v0.4.0 -f docker/Dockerfile .


Run ChainerUI server
--------------------

The Docker container has already setup a command to start the server, and requires port number to be linked (``-p`` option) and volume to be mounted (``-v`` option)::

  $ docker run -d -p 5000:5000 -v /path/to/job:/projects --name chainerui chainer/chainerui:v0.4.0

* ``-p 5000:5000``: the container exposes port ``5000`` for ChainerUI server.
* ``-v /path/to/job:/projects``: the container setups ``/projects`` as `Docker volumes <https://docs.docker.com/storage/volumes/>`__. Remember that Docker volume does not support symbolic link and relative path.

ChainerUI server will run, open http://localhost:5000/ .

When stop the container::

  $ docker stop chainerui

When restart the container::

  $ docker start chainerui

.. warning::

   ChainerUI stores all data, such as logs, args and so on, to the own DB created in the image. **These data are removed when the container is removed.**


Create a project
----------------

To store data such as logs and show a log chart, a project with a result directory path is needed. There are 2 way to register projects to the server, via HTTP or via ``docker exec``. For more detail about project function, see :ref:`getstart_create_project`

.. note::

   The project's path is viewed from the container: guest OS, **not viewed from the host OS**. For example, the result directory is below structure and the container is mounted as ``-v /path/to/job:/projects``::

     On host OS
     /path/to/job
       |--- results
              |--- result1
                     |--- log
              |--- result2
                     |--- log

   The project's path is ``/projects/results``, viewed from guest OS.


Via HTTP
~~~~~~~~

POST a project information to the endpoint ``/projects``, following is an example command using ``curl``::

  $ curl http://localhost:5000/api/v1/projects -X POST -H "Content-Type: application/json" -d '{"project":{"name":"PROJECT_NAME","path_name":"/projects/results"}}'


Call command directly
~~~~~~~~~~~~~~~~~~~~~

ChainerUI command is enabled in the container::

  $ docker exec -it chainerui /bin/bash
  # chainerui project create -d /projects/result -n PROJECT_NAME
