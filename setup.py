# -*- coding: utf-8 -*-
import os
from setuptools.command.sdist import sdist
from setuptools import find_packages
from setuptools import setup
import subprocess


with open('requirements.txt') as f:
    required = f.read().splitlines()


with open(os.path.join('docs', 'requirements.txt')) as f:
    docs_required = f.read().splitlines()


requirements = {
    'install': required,
    'docs': docs_required,
    'stylecheck': [
        'autopep8',
        'hacking',
    ],
    'doctest': [
        'sphinx==1.8.2',
    ],
    'test': [
        'numpy',
        'pytest>=4.0.0,<5.0.0',
        'mock',
    ],
    'test-ci-plain': [
        '-r stylecheck',
        '-r test',
        'pytest-cov',
        'coveralls',
    ],
    'test-ci': [
        '-r test-ci-plain',
        '-r doctest',
        'Pillow',
        'matplotlib',
        'scipy',
        'chainer',
    ],
    'test-ci-contrib': [
        '-r test-ci',
        'pytorch-ignite',
    ]
}


def reduce_requirements(key):
    # Resolve recursive requirements notation (-r)
    reqs = requirements[key]
    resolved_reqs = []
    for req in reqs:
        if req.startswith('-r'):
            depend_key = req[2:].lstrip()
            reduce_requirements(depend_key)
            resolved_reqs += requirements[depend_key]
        else:
            resolved_reqs.append(req)
    requirements[key] = resolved_reqs


for k in requirements.keys():
    reduce_requirements(k)


here = os.path.abspath(os.path.dirname(__file__))
# Get __version__ variable
exec(open(os.path.join(here, 'chainerui', '_version.py')).read())


class chainerui_sdist(sdist):
    def run(self):
        subprocess.check_call('cd frontend && npm run build', shell=True)
        sdist.run(self)


setup(
    name='chainerui',
    version=__version__,  # NOQA
    description='ChainerUI: User Interface for Chainer',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    install_requires=requirements['install'],
    tests_require=requirements['test'],
    extras_require={k: v for k, v in requirements.items() if k != 'install'},
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
    cmdclass={
        'sdist': chainerui_sdist
    },
)
