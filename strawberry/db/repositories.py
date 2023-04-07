import asyncio
from typing import Optional
from uuid import uuid4
from entities.entities import Author
from db.cassandra_connector import session

from interfaces.interfaces import AuthorRepository


class CassandraAuthorRepository(AuthorRepository):
    async def create_author(self, name: str, email: str):
        session.execute_async(
            """
            INSERT INTO authors (author_id, name, email)
            VALUES (%s, %s, %s)
            """,
            (uuid4(), name, email),
        )

    async def get_author_by_id(self, author_id: int) -> Optional[Author]:
        # try:
        #     author = Authors.get(author_id=author_id)
        #     # return Author(author.author_id, author.name, author.email)
        #     return Author(
        #         id_=author.author_id,
        #         name=author.name,
        #         email=author.email,
        #     )
        # except Authors.DoesNotExist:
        #     return None
        pass

    async def update_author(self, author: Author) -> Author:
        # try:
        #     Authors.objects(author_id=author.id_).if_exists().update(
        #         name=author.name, email=author.email
        #     )
        #     return author
        # except LWTException:
        #     raise ValueError("Author does not exist")
        pass

    async def delete_author(self, author_id: int) -> None:
        # Authors.objects(author_id=author_id).if_exists().delete()
        pass


# class CassandraBlogPostRepository(BlogPostRepository):
#     def create_blog_post(self, title: str, content: str, author_id: int) -> BlogPost:
#         blog_post = BlogPosts.create(title=title, content=content, author_id=author_id)
#         return BlogPost(
#             id=blog_post.blogpost_id,
#             title=blog_post.title,
#             content=blog_post.content,
#             author_id=blog_post.author_id,
#         )

#     def get_blog_post_by_id(self, blogpost_id: int) -> Optional[BlogPost]:
#         try:
#             blog_post = BlogPosts.get(blogpost_id=blogpost_id)
#             return BlogPost(
#                 id=blog_post.blogpost_id,
#                 title=blog_post.title,
#                 content=blog_post.content,
#                 author_id=blog_post.author_id,
#             )
#         except BlogPosts.DoesNotExist:
#             return None

#     def get_blog_posts_by_author(self, author_id: int) -> List[BlogPost]:
#         blog_posts = BlogPosts.objects.filter(author_id=author_id)
#         return [
#             BlogPost(
#                 id=post.blogpost_id,
#                 title=post.title,
#                 content=post.content,
#                 author_id=post.author_id,
#             )
#             for post in blog_posts
#         ]

#     def update_blog_post(self, blog_post: BlogPost) -> BlogPost:
#         try:
#             BlogPosts.objects(blogpost_id=blog_post.id).if_exists().update(
#                 title=blog_post.title,
#                 content=blog_post.content,
#                 author_id=blog_post.author_id,
#             )
#             return blog_post
#         except LWTException:
#             raise ValueError("Blog post does not exist")

#     def delete_blog_post(self, blogpost_id: int) -> None:
#         BlogPosts.objects(blogpost_id=blogpost_id).if_exists().delete()


# Establish a connection to the Cassandra cluster
# You need to replace 'localhost' with the address of your Cassandra cluster
# connection.setup(["localhost"], "default_keyspace")

# Instantiate the repositories
author_repository = CassandraAuthorRepository()
# blog_post_repository = CassandraBlogPostRepository()

# Now you can use the repository methods to interact with the database
