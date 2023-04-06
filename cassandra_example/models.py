"""
Module docstring
"""

from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model


class Employee(Model):
    """
    Class docstring
    """
    id = columns.Integer(primary_key=True)
    name = columns.Text()
    age = columns.Integer()
