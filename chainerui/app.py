import argparse
import os

import alembic
from alembic.command import revision
from alembic.config import Config

from chainerui import _version
from chainerui import create_app
from chainerui import create_db
from chainerui import DB_FILE_PATH
from chainerui import DB_SESSION
from chainerui import ENGINE
from chainerui.models.project import Project
from chainerui import PACKAGE_DIR
from chainerui import upgrade_db


def server_handler(args):
    """server_handler."""
    app = create_app()
    app.run(host=args.host, port=args.port, debug=args.debug, threaded=True)


def db_handler(args):
    """db_handler."""

    if args.type == 'create':
        create_db()

    if args.type == 'status':
        ctx = alembic.migration.MigrationContext.configure(ENGINE.connect())
        current_rev = ctx.get_current_revision()
        print('current_rev', current_rev)

    if args.type == 'upgrade':
        upgrade_db()

    if args.type == 'revision':
        ini_path = os.path.join(PACKAGE_DIR, 'alembic.ini')
        config = Config(ini_path)
        config.set_main_option(
            "script_location", os.path.join(PACKAGE_DIR, 'migration'))
        revision(config)

    if args.type == 'drop':
        os.remove(DB_FILE_PATH)


def project_create_handler(args):
    """project_create_handler."""

    project_path = os.path.abspath(args.project_dir)
    project_name = args.project_name

    project = DB_SESSION.query(Project).\
        filter_by(path_name=project_path).first()

    if project is None:
        project = Project.create(project_path, project_name)
    else:
        print('Pathname already registered.')


def main():
    """main."""
    parser = argparse.ArgumentParser(description='chainerui command')
    parser.add_argument(
        '--version', '-v', action='version', version=_version.__version__)
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

    args = parser.parse_args()

    if hasattr(args, 'handler'):
        args.handler(args)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
