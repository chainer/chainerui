def is_numberable(number_str):
    """is_numberable."""
    try:
        int(number_str)
    except ValueError:
        return False
    return True
