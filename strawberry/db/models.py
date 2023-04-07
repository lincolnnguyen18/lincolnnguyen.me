from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

class Authors(Model):
    """
    Access patterns:
    - Get an author by author_id
    """
    author_id = columns.UUID(primary_key=True)
    name = columns.Text(required=True)
    email = columns.Text(required=True)


class BlogPosts(Model):
    """
    Access patterns:
    - Get all blog posts by author_id
    - Get a blog post by blogpost_id and author_id
    """
    blogpost_id = columns.UUID(primary_key=True, clustering_order="DESC")
    author_id = columns.UUID(partition_key=True)
    title = columns.Text(required=True)
    content = columns.Text(required=True)
