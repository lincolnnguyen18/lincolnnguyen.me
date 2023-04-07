from dataclasses import dataclass

@dataclass
class Author:
    id_: int
    name: str
    email: str

@dataclass
class BlogPost:
    id_: int
    title: str
    content: str
    author_id: int
