from setuptools import setup, find_packages

with open('README.md') as f:
    readme = f.read()

setup(
    name='chainer_ui',
    version='0.0.0',
    description='chainer ui',
    long_description=readme,
    author='',
    author_email='',
    url='https://github.com/pfn-intern/intern-chainer-ui',
    packages=find_packages(exclude=('tests', 'docs'))
)