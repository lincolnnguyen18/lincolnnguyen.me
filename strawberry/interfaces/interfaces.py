from abc import ABC, abstractmethod
from typing import List, Optional

from entities.entities import Author, BlogPost


class AuthorRepository(ABC):
    @abstractmethod
    def create_author(self, name: str, email: str) -> Author:
        pass

    @abstractmethod
    def get_author_by_id(self, author_id: int) -> Optional[Author]:
        pass

    @abstractmethod
    def update_author(self, author: Author) -> Author:
        pass

    @abstractmethod
    def delete_author(self, author_id: int) -> None:
        pass


class BlogPostRepository(ABC):
    @abstractmethod
    def create_blog_post(self, title: str, content: str, author_id: int) -> BlogPost:
        pass

    @abstractmethod
    def get_blog_post_by_id(self, blogpost_id: int) -> Optional[BlogPost]:
        pass

    @abstractmethod
    def get_blog_posts_by_author(self, author_id: int) -> List[BlogPost]:
        pass

    @abstractmethod
    def update_blog_post(self, blog_post: BlogPost) -> BlogPost:
        pass

    @abstractmethod
    def delete_blog_post(self, blogpost_id: int) -> None:
        pass
