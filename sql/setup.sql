CREATE TABLE tabs (
    id SERIAL primary key,
    title VARCHAR(50) not null,
    artist VARCHAR(50) not null,
    type VARCHAR(10) not null,
    haslyrics VARCHAR(50) not null,
    tab TEXT not null,
    ver INTEGER DEFAULT 0,
    creator_id INTEGER not null DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    id SERIAL primary key,
    username VARCHAR(50) not null,
    email VARCHAR(50) not null unique,
    hashedpass VARCHAR(255) not null,
    img VARCHAR(255) DEFAULT '/img/defaultavatar.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE songbooks (
    id SERIAL primary key,
    name VARCHAR (20) not null,
    owner_id INTEGER not null,
    tabs INTEGER []
);

-- Comands to alter bd state

-- Add column
ALTER TABLE tabs ADD ver INTEGER DEFAULT 0;

-- Change type
ALTER TABLE tabs ALTER tab TYPE MEDIUMTEXT;

-- change constrains
ALTER TABLE tabs ADD UNIQUE (tab);

-- Set Default
ALTER TABLE users ALTER img SET DEFAULT '/img/defaultavatar.png';

-- Delete rows
DELETE FROM users WHERE id = $1;

-- Update row
UPDATE users SET img = '/img/saitama.jpg' WHERE id = 2;

-- ADD tabs to songbook array
UPDATE songbooks SET tabs = tabs || $1
WHERE id = $2;
-- REMOVE tabs from songbook array
UPDATE songbooks SET tabs = array_remove(tabs, $1)
WHERE id = $2;

-- remove tab from all songbooks that use them
SELECT tabs FROM songbooks WHERE $1 = ANY(tabs)
UPDATE songbooks SET tabs = array_remove(tabs, $1)

-- Version control INSERT
INSERT INTO tabs (title, artist, type, haslyrics, tab, vers)
VALUES ($1, $2, $3, $4, $5, (
    SELECT COUNT(*) FROM tabs
    WHERE title = $1
    AND artist = $2
    AND type = $3
    AND haslyrics = $4
))
