# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

with open('README.md') as f:
    readme = f.read()

with open('requirements.txt') as f:
    required = f.read().splitlines()

setup(
    name='chainer_ui',
    version='0.0.5',
    description='chainer ui',
    long_description=readme,
    install_requires=required,
    package_data={
        'chainer_ui': [
            'templates/*',
            'static/**/*'
        ],
    },
    author='',
    author_email='',
    url='https://github.com/pfn-intern/intern-chainer-ui',
    packages=find_packages(exclude=('tests', 'docs')),
    entry_points={
        "console_scripts": [
            "chainer-ui=chainer_ui.app:main",
        ]
    }
)
