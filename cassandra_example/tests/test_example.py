"""
Module docstring
"""

import unittest

def add(num_1: int, num_2: int) -> int:
    """
    Function docstring
    """
    return num_1 + num_2

# Define the test class


class TestAddition(unittest.TestCase):
    """
    Class docstring
    """
    def test_addition(self) -> None:
        """
        Method docstring
        """
        # Test cases
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(0, 0), 0)


# Run the tests
if __name__ == '__main__':
    unittest.main()
