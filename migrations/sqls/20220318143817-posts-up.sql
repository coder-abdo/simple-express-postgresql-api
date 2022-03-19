/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE posts(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title varchar(50) NOT NULL,
    body varchar(255) NOT NULL,
    author varchar(50) NOT NULL
)
