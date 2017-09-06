''' app.py '''


import argparse
import os


from chainer_ui import create_app, create_db, create_db_session
from chainer_ui import DB_FILE_PATH, ENGINE
from alembic.migration import MigrationContext


def server_handler(args):
    ''' server_handler '''
    print('server_handler', args)
    app = create_app()
    app.run(threaded=True)


def register_handler(args):
    ''' register_handler '''
    print('register_handler', args)

    def contain_log_file(result_path):
        ''' contain_log_file '''
        log_path = os.path.join(result_path, 'log')
        return os.path.isfile(log_path)

    db_session = create_db_session()

    result_path = args.result_dir
    from chainer_ui.models.result import Result

    if contain_log_file(result_path):
        new_result_path = Result(os.path.abspath(result_path))
        db_session.add(new_result_path)
        db_session.commit()

    else:
        print('ng')


def db_handler(args):
    ''' db_handler '''
    print('db_handler', args)

    if args.type == 'create':
        create_db()

    if args.type == 'migrate':
        context = MigrationContext.configure(ENGINE.connect())
        current_rev = context.get_current_revision()
        print(current_rev)
        print('plz use: `alembic upgrade head`')

    if args.type == 'drop':
        os.remove(DB_FILE_PATH)


def main():
    ''' main '''
    parser = argparse.ArgumentParser(description='chainer-ui command')
    subparsers = parser.add_subparsers()

    parser_server = subparsers.add_parser(
        'server', help='see `chainer-ui server -h`')
    parser_server.add_argument(
        '-p', '--port', required=False, type=int, help='port', default=5000)
    parser_server.set_defaults(handler=server_handler)

    parser_register = subparsers.add_parser(
        'register', help='see `chainer-ui register -h`')
    parser_register.add_argument(
        '-d', '--result-dir', required=True, type=str, help='result-dir')
    parser_register.set_defaults(handler=register_handler)

    parser_db = subparsers.add_parser('db', help='see `chainer-ui db -h`')
    parser_db.add_argument('type', choices=['create', 'drop', 'migrate'])
    parser_db.set_defaults(handler=db_handler)

    args = parser.parse_args()

    if hasattr(args, 'handler'):
        args.handler(args)
    else:
        print('see `chainer-ui -h`')


if __name__ == '__main__':
    main()
