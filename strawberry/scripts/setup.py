from cassandra.cqlengine import connection
from cassandra.cqlengine.management import sync_table

from db.models import Authors, BlogPosts


def initialize_cassandra_connection():
    connection.setup(["localhost"], "default_keyspace")
    models = (Authors, BlogPosts)
    for model in models:
        sync_table(model)
