import unittest

from chainerui.utils import is_jsonable
from chainerui.utils import is_numberable
from datetime import datetime


class TestUtils(unittest.TestCase):

    def test_is_jsonable(self):
        assert is_jsonable(['string'])
        assert is_jsonable([datetime.now()]) is False

    def test_is_numberable(self):
        assert is_numberable('12345')
        assert is_numberable('abcde') is False
