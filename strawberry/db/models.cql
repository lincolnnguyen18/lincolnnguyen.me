CREATE TABLE authors (
    author_id UUID PRIMARY KEY,
    name TEXT,
    email TEXT
);

CREATE TABLE blog_posts (
    blogpost_id UUID,
    author_id UUID,
    title TEXT,
    content TEXT,
    PRIMARY KEY (author_id, blogpost_id)
) WITH CLUSTERING ORDER BY (blogpost_id DESC);
