import alembic
from alembic import context
from sqlalchemy import engine_from_config
from sqlalchemy import pool


def run_migrations_online(config):
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine and associate a
    connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool)

    with connectable.connect() as connection:
        alembic.context.configure(connection=connection)

        with alembic.context.begin_transaction():
            alembic.context.run_migrations()


def main():
    """main."""
    config = context.config
    config.set_main_option("sqlalchemy.url", config.get_main_option('url'))
    run_migrations_online(config)


main()
