try:
    from ujson import dump  # NOQA
    from ujson import dumps  # NOQA
    from ujson import load  # NOQA
    from ujson import loads  # NOQA
except ImportError:
    from json import dump  # NOQA
    from json import dumps  # NOQA
    from json import load  # NOQA
    from json import loads  # NOQA
