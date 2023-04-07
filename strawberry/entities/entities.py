from dataclasses import dataclass
from uuid import UUID

@dataclass
class Author:
    uuid: UUID
    name: str
    email: str

@dataclass
class BlogPost:
    id_: UUID
    title: str
    content: str
    author_id: UUID
