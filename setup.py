# -*- coding: utf-8 -*-

from setuptools import setup, find_packages
from setuptools.command.sdist import sdist
import subprocess

with open('README.md', 'r', encoding='utf-8') as f:
    readme = f.read()

with open('requirements.txt') as f:
    required = f.read().splitlines()


class chainerui_sdist(sdist):
    def run(self):
        subprocess.call('cd frontend && npm run build', shell=True)
        sdist.run(self)


setup(
    name='chainerui',
    version='0.0.9',
    description='chainerui',
    long_description=readme,
    install_requires=required,
    package_data={
        'chainerui': [
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
            "chainerui=chainerui.app:main",
        ]
    },
    tests_require=['pytest'],
    cmdclass={
        'sdist': chainerui_sdist
    },
)
