"""
Module docstring
"""

from cassandra.cluster import Cluster
from cassandra.cqlengine import connection
from cassandra.cqlengine.management import create_keyspace_simple, sync_table
from models import Employee


def main() -> None:
    """
    Function docstring
    """
    # Connect to the local Cassandra cluster
    cluster = Cluster(['127.0.0.1'])
    cluster.connect()

    # Set up the connection and specify the default keyspace
    connection.setup(['127.0.0.1'], default_keyspace='default')

    # Create a keyspace
    create_keyspace_simple('test_keyspace', replication_factor=1)

    # Set up the connection and specify the default keyspace
    connection.setup(['127.0.0.1'], 'test_keyspace')

    # Synchronize the model
    sync_table(Employee)

    # Insert some data using the model
    Employee.create(id=1, name='John Doe', age=30)
    Employee.create(id=2, name='Jane Smith', age=25)
    Employee.create(id=3, name='Bob Johnson', age=45)

    # Query the data using the model
    employees = Employee.objects.all()

    # Print the results
    for employee in employees:
        print(employee.id, employee.name, employee.age)

    # Close the connection
    cluster.shutdown()

    print("Done!")


if __name__ == "__main__":
    main()
