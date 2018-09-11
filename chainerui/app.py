import argparse
import os
import signal

import gevent
from gevent.pywsgi import WSGIServer

from chainerui import _version
from chainerui import CHAINERUI_ENV
from chainerui import create_app
from chainerui import db
from chainerui.models.project import Project
from chainerui.utils import db_revision


def _setup_db(db_url):
    test_mode = CHAINERUI_ENV == 'test'
    echo = CHAINERUI_ENV == 'development'
    return db.setup(url=db_url, test_mode=test_mode, echo=echo)


def _check_db_revision():
    if not db_revision.check_current_db_revision():
        command = 'upgrade'
        if db_revision.current_db_revision() is None:
            command = 'setup'
        msg = 'The current DB schema version is not supported, ' +\
            'please %s DB' % command
        print(msg)
        return False
    return True


def server_handler(args):
    """server_handler."""
    if not _setup_db(args.db):
        return
    if not _check_db_revision():
        return

    app = create_app()
    if args.debug:
        # start server with:
        # - env: development
        # - debug: on
        app.config['ENV'] = 'development'
        app.run(host=args.host, port=args.port, debug=True, threaded=True)
    else:
        # start server with:
        # - env: production
        # - debug: off
        listener = '{:s}:{:d}'.format(args.host, args.port)
        http_server = WSGIServer(listener, application=app)

        def stop_server():
            if http_server.started:
                http_server.stop()

        gevent.signal(signal.SIGTERM, stop_server)
        gevent.signal(signal.SIGINT, stop_server)

        print(' * Environment: production')
        print(' * Running on http://{}/ (Press CTRL+C to quit)'
              .format(listener))

        try:
            http_server.serve_forever()
        except (KeyboardInterrupt, SystemExit):
            stop_server()


def db_handler(args):
    """db_handler."""

    if args.type == 'create':
        if args.db is None:
            db.init_db()
        return

    if not _setup_db(args.db):
        return

    if args.type == 'status':
        current_rev = db_revision.current_db_revision()
        print('current_rev', current_rev)

    if args.type == 'upgrade':
        db.upgrade()

    if args.type == 'revision':
        db_revision.new_revision()

    if args.type == 'drop':
        if args.db is not None:
            db.downgrade()
        db.remove_db()


def project_create_handler(args):
    """project_create_handler."""
    if not _setup_db(args.db):
        return
    if not _check_db_revision():
        return

    project_path = os.path.abspath(args.project_dir)
    project_name = args.project_name

    project = db.session.query(Project).\
        filter_by(path_name=project_path).first()

    if project is None:
        project = Project.create(project_path, project_name)
    else:
        print('Pathname already registered.')


def create_parser():
    parser = argparse.ArgumentParser(description='chainerui command')
    parser.add_argument(
        '--version', '-v', action='version', version=_version.__version__)
    parser.add_argument(
        '--db', help='database resource address',
        default=os.getenv('CHAINERUI_DB_URL', default=None))
    subparsers = parser.add_subparsers()

    # chainerui server
    parser_server = subparsers.add_parser(
        'server', help='see `chainerui server -h`')
    parser_server.add_argument(
        '-H', '--host', required=False, help='host', default='localhost')
    parser_server.add_argument(
        '-p', '--port', required=False, type=int, help='port', default=5000)
    parser_server.add_argument(
        '-d', '--debug', action='store_true', help='debug')
    parser_server.set_defaults(
        handler=server_handler)

    # chainerui db
    parser_db = subparsers.add_parser(
        'db', help='see `chainerui db -h`')
    parser_db.add_argument(
        'type', choices=['create', 'drop', 'status', 'upgrade', 'revision'])
    parser_db.set_defaults(
        handler=db_handler)

    # chainerui project
    parser_project = subparsers.add_parser(
        'project', help='see `chainerui project -h`')
    parser_project_sub = parser_project.add_subparsers()

    # chainerui project create
    parser_project_create = parser_project_sub.add_parser(
        'create', help='see `chainerui project create -h`')
    parser_project_create.add_argument(
        '-d', '--project-dir', required=True, type=str, help='project-dir')
    parser_project_create.add_argument(
        '-n', '--project-name', type=str, help='project-name', default=None)
    parser_project_create.set_defaults(
        handler=project_create_handler)

    return parser


def main():
    """main."""
    parser = create_parser()
    args = parser.parse_args()

    if hasattr(args, 'handler'):
        args.handler(args)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
