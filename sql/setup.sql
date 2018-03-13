CREATE TABLE tabs (
    id SERIAL primary key,
    title VARCHAR(50) not null,
    artist VARCHAR(50) not null,
    type VARCHAR(10) not null,
    haslyrics VARCHAR(50) not null,
    tab TEXT not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    id SERIAL primary key,
    username VARCHAR(50) not null,
    email VARCHAR(50) not null unique,
    hashedpass VARCHAR(255) not null,
    img VARCHAR(255) DEFAULT '~/assets/img/defaultavatar.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE tabs ADD type VARCHAR(10) not null;
ALTER TABLE tabs ADD UNIQUE (tab);

ALTER TABLE tabs ALTER tab TYPE MEDIUMTEXT;

-- Delete rows
DELETE FROM users
WHERE id = $1
