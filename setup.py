# -*- coding: utf-8 -*-
from setuptools.command.sdist import sdist
from setuptools import find_packages
from setuptools import setup
import subprocess

with open('requirements.txt') as f:
    required = f.read().splitlines()


class chainerui_sdist(sdist):
    def run(self):
        subprocess.check_call('cd frontend && npm run build', shell=True)
        sdist.run(self)


setup(
    name='chainerui',
    version='0.1.0',
    description='ChainerUI: User Interface for Chainer',
    install_requires=required,
    package_data={
        'chainerui': [
            'templates/*',
            'static/**/*'
        ],
    },
    author='',
    author_email='',
    url='https://github.com/chainer/chainerui',
    packages=find_packages(exclude=('tests', 'docs')),
    entry_points={
        "console_scripts": [
            "chainerui=chainerui.app:main",
        ]
    },
    tests_require=['pytest'],
    cmdclass={
        'sdist': chainerui_sdist
    },
)
