''' app.py '''


import argparse
import os


from chainer_ui import create_app, create_db
from chainer_ui import (DB_FILE_PATH, ENGINE, SQLALCHEMY_DATABASE_URI,
                        PACKAGE_DIR, DB_SESSION)
from chainer_ui.models.project import Project
from alembic import context
from alembic.migration import MigrationContext
from alembic.command import upgrade, revision
from alembic.config import Config


def server_handler(args):
    ''' server_handler '''
    print('server_handler', args)
    app = create_app(args)
    app.run(host=args.host, port=args.port, threaded=True)


def db_handler(args):
    ''' db_handler '''
    print('db_handler', args)

    if args.type == 'create':
        create_db()

    if args.type == 'migrate':
        ctx = MigrationContext.configure(ENGINE.connect())
        current_rev = ctx.get_current_revision()
        print('current_rev', current_rev)

    if args.type == 'upgrade':
        ini_path = os.path.join(PACKAGE_DIR, 'alembic.ini')
        config = Config(ini_path)
        config.set_main_option("script_location", os.path.join(PACKAGE_DIR, 'migration'))
        upgrade(config, 'head')

    if args.type == 'revision':
        ini_path = os.path.join(PACKAGE_DIR, 'alembic.ini')
        config = Config(ini_path)
        config.set_main_option("script_location", os.path.join(PACKAGE_DIR, 'migration'))
        revision(config)

    if args.type == 'drop':
        os.remove(DB_FILE_PATH)


def project_handler(args):
    ''' project_handler '''
    print('project_handler', args)

    if args.type == 'create':
        project_path = os.path.abspath(args.project_dir)
        project_name = args.project_name

        project = DB_SESSION.query(Project).\
            filter_by(path_name=project_path).first()

        if project is None:
            project = Project(project_path, project_name)
        else:
            print('Pathname already registered.')

        DB_SESSION.add(project)
        DB_SESSION.commit()

    else:
        pass


def main():
    ''' main '''
    parser = argparse.ArgumentParser(description='chainer-ui command')
    subparsers = parser.add_subparsers()

    parser_server = subparsers.add_parser(
        'server', help='see `chainer-ui server -h`')
    parser_server.add_argument(
        '-H', '--host', required=False, help='host', default='localhost'
    )
    parser_server.add_argument(
        '-p', '--port', required=False, type=int, help='port', default=5000
    )
    parser_server.set_defaults(handler=server_handler)

    parser_db = subparsers.add_parser('db', help='see `chainer-ui db -h`')
    parser_db.add_argument('type', choices=[
        'create', 'drop', 'migrate', 'upgrade', 'revision'
    ])
    parser_db.set_defaults(handler=db_handler)

    parser_project = subparsers.add_parser('project', help='see `chainer-ui project -h`')
    parser_project.add_argument('type', choices=[
        'create'
    ])
    parser_project.add_argument(
        '-d', '--project-dir', required=True,
        type=str, help='project-dir', default=''
    )
    parser_project.add_argument(
        '-n', '--project-name', required=False,
        type=str, help='project-name', default=''
    )
    parser_project.set_defaults(handler=project_handler)

    args = parser.parse_args()

    if hasattr(args, 'handler'):
        args.handler(args)
    else:
        print('see `chainer-ui -h`')


if __name__ == '__main__':
    main()
