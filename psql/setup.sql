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
    first VARCHAR(50) not null,
    last VARCHAR(50) not null,
    email VARCHAR(50) not null unique,
    hashedpass VARCHAR(255) not null,
    img VARCHAR(255) DEFAULT '/assets/defaultavatar.png',
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE tabs ADD type VARCHAR(10) not null;
ALTER TABLE tabs ADD UNIQUE (tab);

TEST TAB HERE WE GO
------------------------------------------------
------------------------------------------------
------------------------------------------------
------------------------------------------------
------------------------------------------------
------------------------------------------------
