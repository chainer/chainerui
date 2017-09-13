''' app.py '''


import argparse
import os


from chainer_ui import create_app, create_db
from chainer_ui import (DB_FILE_PATH, ENGINE, SQLALCHEMY_DATABASE_URI,
                        PACKAGE_DIR, DB_SESSION)
from alembic import context
from alembic.migration import MigrationContext
from alembic.command import upgrade, revision
from alembic.config import Config


def server_handler(args):
    ''' server_handler '''
    print('server_handler', args)
    app = create_app(args)
    app.run(host=args.host, port=args.port, threaded=True)


def register_handler(args):
    ''' register_handler '''
    print('register_handler', args)

    def contain_log_file(result_path):
        ''' contain_log_file '''
        log_path = os.path.join(result_path, 'log')
        return os.path.isfile(log_path)

    result_path = os.path.abspath(args.result_dir)
    from chainer_ui.models.result import Result

    if contain_log_file(result_path):
        new_result_path = Result(os.path.abspath(result_path))
        DB_SESSION.add(new_result_path)
        DB_SESSION.commit()

    else:
        print('ng')


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
    parser_server.add_argument(
        '-d', '--target-dir', required=False,
        type=str, help='target-dir', default=''
    )
    parser_server.set_defaults(handler=server_handler)

    parser_register = subparsers.add_parser(
        'register', help='see `chainer-ui register -h`')
    parser_register.add_argument(
        '-d', '--result-dir', required=True, type=str, help='result-dir')
    parser_register.set_defaults(handler=register_handler)

    parser_db = subparsers.add_parser('db', help='see `chainer-ui db -h`')
    parser_db.add_argument('type', choices=[
        'create', 'drop', 'migrate', 'upgrade', 'revision'
    ])
    parser_db.set_defaults(handler=db_handler)

    args = parser.parse_args()

    if hasattr(args, 'handler'):
        args.handler(args)
    else:
        print('see `chainer-ui -h`')


if __name__ == '__main__':
    main()
