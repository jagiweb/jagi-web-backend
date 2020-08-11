CREATE DATABASE jagiweb;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE portfolios(
    portfolio_id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    img_url TEXT,
    video_url TEXT
);

-- CREATE TABLE FOR PORTFOLIO WITH COLUMNS