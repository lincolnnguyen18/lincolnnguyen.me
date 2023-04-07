# from cassandra.cqlengine import columns
# from cassandra.cqlengine.models import Model

# from entities.entities import Author, BlogPost


# class Authors(Model):
#     """
#     Access patterns:
#     - Get an author by author_id
#     """

#     author_id = columns.UUID(primary_key=True)
#     name = columns.Text(required=True)
#     email = columns.Text(required=True, index=True)

#     def to_entity(self) -> Author:
#         return Author(
#             id_=str(self.author_id),
#             name=str(self.name),
#             email=str(self.email),
#         )


# class BlogPosts(Model):
#     """
#     Access patterns:
#     - Get all blog posts by author_id
#     - Get a blog post by blogpost_id and author_id
#     """

#     blogpost_id = columns.UUID(primary_key=True, clustering_order="DESC")
#     author_id = columns.UUID(partition_key=True)
#     title = columns.Text(required=True)
#     content = columns.Text(required=True)

#     def to_entity(self) -> BlogPost:
#         return BlogPost(
#             id_=str(self.blogpost_id),
#             title=str(self.title),
#             content=str(self.content),
#             author_id=str(self.author_id),
#         )
